const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/app/cards-v2/page.tsx', 'utf-8');

// Replace all customizationSettings references with default values
const replacements = [
  // Visual properties
  [/customizationSettings\?\.visual\?\.borderRadius \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.visual\?\.borderWidth \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.visual\?\.borderStyle \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.visual\?\.shadowColor \|\| '([^']+)'/g, "'$1'"],
  [/customizationSettings\?\.layout\?\.cardPadding \|\| (\d+)/g, '$1'],

  // Complex visual effects - replace with simple defaults
  [/boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?'0 6px 12px rgba\(0,0,0,0\.15\)'/g, "boxShadow: '0 6px 12px rgba(0,0,0,0.15)'"],
  [/boxShadow: customizationSettings\?\.visual\?\.shadowIntensity[\s\S]*?'0 4px 6px rgba\(0,0,0,0\.1\)'/g, "boxShadow: '0 4px 6px rgba(0,0,0,0.1)'"],

  // Opacity
  [/opacity: customizationSettings\?\.visual\?\.backgroundOpacity \? customizationSettings\.visual\.backgroundOpacity \/ 100 : 1/g, "opacity: 1"],

  // Filter - replace multi-line filter with simple 'none'
  [/filter: customizationSettings\?\.visual \? `[\s\S]*?`.trim\(\) : 'none'/g, "filter: 'none'"],

  // Typography - we removed these already but just in case
  [/customizationSettings\?\.typography\?\.titleSize \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.typography\?\.questionSize \|\| (\d+)/g, '$1'],
  [/customizationSettings\?\.typography\?\.answerSize \|\| (\d+)/g, '$1'],
];

// Apply all replacements
replacements.forEach(([pattern, replacement]) => {
  content = content.replace(pattern, replacement);
});

// Write the updated content
fs.writeFileSync('src/app/cards-v2/page.tsx', content);

console.log('Successfully fixed all customization settings!');