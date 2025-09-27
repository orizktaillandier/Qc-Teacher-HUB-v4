const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/app/cards-v2/page.tsx', 'utf-8');

// Replace ALL customizationSettings references
// Typography references
content = content.replace(/customizationSettings\?\.typography\?\.titleWeight \|\| 'bold'/g, "'bold'");
content = content.replace(/customizationSettings\?\.typography\?\.fontFamily \|\| 'inherit'/g, "pageFontSettings.fontFamily || 'inherit'");
content = content.replace(/customizationSettings\?\.typography\?\.textAlign \|\| 'left'/g, "'left'");
content = content.replace(/customizationSettings\?\.typography\?\.questionColor \|\| '#6b7280'/g, "'#6b7280'");
content = content.replace(/customizationSettings\?\.typography\?\.questionBold \? 'bold' : 'normal'/g, "pageFontSettings.isBold ? 'bold' : 'normal'");
content = content.replace(/customizationSettings\?\.typography\?\.questionItalic \? 'italic' : 'normal'/g, "pageFontSettings.isItalic ? 'italic' : 'normal'");
content = content.replace(/customizationSettings\?\.typography\?\.lineHeight \|\| 1.5/g, "1.5");
content = content.replace(/customizationSettings\?\.typography\?\.letterSpacing \|\| 0/g, "0");
content = content.replace(/customizationSettings\?\.typography\?\.answerColor \|\| theme.correctColor/g, "theme.correctColor");
content = content.replace(/customizationSettings\?\.typography\?\.answerBold \? 'bold' : 'semibold'/g, "pageFontSettings.isBold ? 'bold' : 'semibold'");
content = content.replace(/customizationSettings\?\.typography\?\.answerItalic \? 'italic' : 'normal'/g, "pageFontSettings.isItalic ? 'italic' : 'normal'");

// Visual effects - replace the complex shadow calculations
const shadowRegex = /boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?\: `([^`]+)`/g;
content = content.replace(shadowRegex, "boxShadow: `$1`");

// Write the updated content
fs.writeFileSync('src/app/cards-v2/page.tsx', content);

console.log('Successfully fixed ALL remaining customization settings!');