const fs = require('fs');

const images = {
  entradas: [
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80"
  ],
  fuertes: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  ],
  postres: [
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  ],
  bebidas: [
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  ]
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const menuMatch = content.match(/menu:\s*(\[\s*\{[\s\S]*\}\s*\])\s*\n\};/);
  if (!menuMatch) return;

  const menuStr = menuMatch[1];
  let menu = JSON.parse(menuStr);

  const keys = ['entradas', 'fuertes', 'postres', 'bebidas'];

  menu.forEach((category, catIndex) => {
    const key = keys[catIndex];
    const categoryImages = images[key];

    category.items.forEach((item, itemIndex) => {
      item.image = categoryImages[itemIndex % categoryImages.length];
    });
  });

  const newMenuStr = JSON.stringify(menu, null, 4);
  content = content.replace(menuStr, newMenuStr);

  fs.writeFileSync(filePath, content);
  console.log('Restored original premium images in ' + filePath);
}

processFile('./src/data/siteDataEs.ts');
processFile('./src/data/siteDataEn.ts');
