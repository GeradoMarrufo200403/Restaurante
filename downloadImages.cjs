const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'images', 'menu');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      resolve(); // already downloaded
      return;
    }
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, res => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const menuMatch = content.match(/menu:\s*(\[\s*\{[\s\S]*\}\s*\])\s*\n\};/);
  if (!menuMatch) return;
  
  const menuStr = menuMatch[1];
  let menu = JSON.parse(menuStr);
  
  console.log(`Processing ${filePath}...`);
  for (let catIndex = 0; catIndex < menu.length; catIndex++) {
    for (let itemIndex = 0; itemIndex < menu[catIndex].items.length; itemIndex++) {
      const item = menu[catIndex].items[itemIndex];
      const filename = `item-${catIndex}-${itemIndex}.jpg`;
      const destPath = path.join(imgDir, filename);
      
      // We use English name for better AI generation results (assuming siteDataEn has english names, but we can just use the item name)
      const prompt = `Delicious ${item.name}, professional food photography, restaurant quality, 4k`;
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
      
      try {
        await downloadImage(url, destPath);
        item.image = `/images/menu/${filename}`;
        console.log(`Downloaded ${filename} for ${item.name}`);
      } catch (e) {
        console.error(`Failed to download ${filename}:`, e);
      }
      
      // Small delay to prevent rate limits
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  const newMenuStr = JSON.stringify(menu, null, 4);
  content = content.replace(menuStr, newMenuStr);
  fs.writeFileSync(filePath, content);
}

async function run() {
  await processFile('./src/data/siteDataEs.ts');
  await processFile('./src/data/siteDataEn.ts');
  console.log('All images downloaded and updated!');
}

run();
