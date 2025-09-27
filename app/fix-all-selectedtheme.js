const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/app/cards-v2/page.tsx', 'utf-8');

// Remove all selectedTheme.style.decorations?.pattern conditions and their blocks
content = content.replace(/\{selectedTheme\.style\.decorations\?\?\.pattern && \([^}]*\}\s*\)\}/g, '');

// Remove all selectedTheme.style.type !== 'solid' conditions and their blocks
content = content.replace(/\{selectedTheme\.style\.type !== 'solid' && \([^}]*\}\s*\)\}/g, '');

// Replace textShadow conditions with simple values
content = content.replace(/textShadow: selectedTheme\.style\.type !== 'solid' \? '2px 2px 4px rgba\(0,0,0,0\.1\)' : 'none'/g, "textShadow: '2px 2px 4px rgba(0,0,0,0.1)'");

// Write the updated content
fs.writeFileSync('src/app/cards-v2/page.tsx', content);

console.log('Successfully removed all selectedTheme references!');