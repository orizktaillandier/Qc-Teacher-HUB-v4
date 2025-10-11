// Quick test to check theme indices
const { allCardThemes, getAllThemeByIndex } = require('./src/lib/themes/all-card-themes.ts');

console.log('Total themes:', allCardThemes.length);
console.log('\nFirst 10 themes:');
for (let i = 0; i < 10; i++) {
  const theme = getAllThemeByIndex(i);
  console.log(`${i}: ${theme.name || 'No name'} - Type: ${theme.type || 'unknown'}`);
}

console.log('\nThemes 19-25 (transition from original to teacher):');
for (let i = 19; i < 25; i++) {
  const theme = getAllThemeByIndex(i);
  console.log(`${i}: ${theme.name || 'No name'} - Type: ${theme.type || 'unknown'}`);
}