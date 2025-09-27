const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/app/cards-v2/page.tsx', 'utf-8');

// Replace the selectedTheme.style.type conditions - just show the decorations
content = content.replace(/\{selectedTheme\.style\.type !== 'solid' && \(/g, '{(');

// Write the updated content
fs.writeFileSync('src/app/cards-v2/page.tsx', content);

console.log('Successfully fixed final selectedTheme references!');