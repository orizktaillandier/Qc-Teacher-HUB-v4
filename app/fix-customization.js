const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/app/cards-v2/page.tsx', 'utf-8');

// Replace all customizationSettings references with their default values
const replacements = [
  // Visual properties
  [/customizationSettings\?\.visual\?\.borderRadius \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.visual\?\.borderWidth \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.visual\?\.borderStyle \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.visual\?\.shadowColor \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.layout\?\.cardPadding \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.animation\?\.transitionDuration \|\| (\d+)/g, '$1'],

  // Typography properties - replace with font settings
  [/customizationSettings\?\.typography\?\.titleSize \|\| (\d+)/g, 'pageFontSettings.fontSize || $1'],
  [/customizationSettings\?\.typography\?\.questionSize \|\| (\d+)/g, 'pageFontSettings.fontSize || $1'],
  [/customizationSettings\?\.typography\?\.answerSize \|\| (\d+)/g, 'pageFontSettings.fontSize || $1'],
  [/customizationSettings\?\.typography\?\.fontFamily \|\| '([^']+)'/g, "pageFontSettings.fontFamily || '$1'"],
  [/customizationSettings\?\.typography\?\.titleWeight \|\| '([^']+)'/g, "pageFontSettings.isBold ? 'bold' : '$1'"],
  [/customizationSettings\?\.typography\?\.questionBold \? '([^']+)' : '([^']+)'/g, "pageFontSettings.isBold ? '$1' : '$2'"],
  [/customizationSettings\?\.typography\?\.answerBold \? '([^']+)' : '([^']+)'/g, "pageFontSettings.isBold ? '$1' : '$2'"],
  [/customizationSettings\?\.typography\?\.questionItalic \? '([^']+)' : '([^']+)'/g, "pageFontSettings.isItalic ? '$1' : '$2'"],
  [/customizationSettings\?\.typography\?\.answerItalic \? '([^']+)' : '([^']+)'/g, "pageFontSettings.isItalic ? '$1' : '$2'"],

  // Complex visual effects - simplify to defaults
  [/boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?'0 6px 15px rgba\(0,0,0,0\.15\)'/g, "boxShadow: '0 6px 15px rgba(0,0,0,0.15)'"],
  [/boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?'0 4px 6px rgba\(0,0,0,0\.1\)'/g, "boxShadow: '0 4px 6px rgba(0,0,0,0.1)'"],
  [/boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?`0 2px 8px \$\{[^}]+\}`/g, "boxShadow: '0 2px 8px rgba(0,0,0,0.1)'"],

  [/opacity: customizationSettings\?\.visual\?\.backgroundOpacity \? customizationSettings\.visual\.backgroundOpacity \/ 100 : 1/g, "opacity: 1"],
  [/filter: customizationSettings\?\.visual \? `[\s\S]*?`.trim\(\) : 'none'/g, "filter: 'none'"],

  // Other typography properties with defaults
  [/customizationSettings\?\.typography\?\.questionColor \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.typography\?\.answerColor \|\| ([^,\s]+)/g, '$1'],
  [/customizationSettings\?\.typography\?\.textAlign \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.typography\?\.lineHeight \|\| ([\d.]+)/g, '$1'],
  [/customizationSettings\?\.typography\?\.letterSpacing \|\| (\d+)/g, '$1']
];

// Apply all replacements
replacements.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

// Remove the old getDefaultSettings function since we don't need it
content = content.replace(/  \/\/ Default settings template[\s\S]*?}\);/m, '');

// Write the updated content
fs.writeFileSync('src/app/cards-v2/page.tsx', content);

console.log('Successfully fixed customization settings!');