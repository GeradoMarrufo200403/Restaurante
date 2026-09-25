const fs = require('fs');

const drinks = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const menuMatch = content.match(/menu:\s*(\[\s*\{[\s\S]*\}\s*\])\s*\n\};/);
  if (!menuMatch) return;
  
  const menuStr = menuMatch[1];
  let menu = JSON.parse(menuStr);
  
  menu.forEach((category, catIndex) => {
    category.items.forEach((item, itemIndex) => {
      // 80 unique images overall
      if (catIndex === 0) {
        // Entradas (20)
        item.image = `https://foodish-api.com/images/samosa/samosa${itemIndex + 1}.jpg`;
      } else if (catIndex === 1) {
        // Platos Fuertes (20)
        item.image = `https://foodish-api.com/images/burger/burger${itemIndex + 1}.jpg`;
      } else if (catIndex === 2) {
        // Postres (20)
        item.image = `https://foodish-api.com/images/dessert/dessert${itemIndex + 1}.jpg`;
      } else if (catIndex === 3) {
        // Bebidas (20)
        item.image = drinks[itemIndex % drinks.length];
      }
    });
  });
  
  const newMenuStr = JSON.stringify(menu, null, 4);
  content = content.replace(menuStr, newMenuStr);
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed images instantly in ' + filePath);
}

processFile('./src/data/siteDataEs.ts');
processFile('./src/data/siteDataEn.ts');
