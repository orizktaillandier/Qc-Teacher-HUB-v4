// Theme System Verification Script
import { allCardThemes, getAllThemeByIndex, themeCategories } from './themes/all-card-themes';
import { fontCategories, getAllFonts } from './font-system';

export function verifyThemeSystem() {
  console.log('🔍 Theme System Verification Report');
  console.log('=====================================');

  // 1. Check total themes available
  console.log(`✅ Total themes available: ${allCardThemes.length}`);

  // 2. Check theme categories
  console.log(`✅ Theme categories: ${Object.keys(themeCategories).join(', ')}`);

  // 3. Sample themes by type
  console.log('\n📋 Sample themes by type:');

  // Professional theme (should have nested structure)
  const professionalTheme = getAllThemeByIndex(0) as any;
  console.log('Professional Theme (index 0):', {
    type: professionalTheme.type,
    hasPattern: !!professionalTheme.pattern,
    hasBackground: !!professionalTheme.background,
    hasNumberBadge: !!professionalTheme.numberBadgeBackground
  });

  // Gradient theme (should have direct gradient)
  const gradientTheme = getAllThemeByIndex(5) as any;
  console.log('Gradient Theme (index 5):', {
    type: gradientTheme.type,
    hasGradient: gradientTheme.background?.includes('gradient'),
    hasNumberBadge: !!gradientTheme.numberBadgeBackground
  });

  // Illustration theme (should have SVG decorations)
  const illustrationTheme = getAllThemeByIndex(12) as any;
  console.log('Illustration Theme (index 12):', {
    type: illustrationTheme.type,
    hasIllustration: !!illustrationTheme.illustration,
    illustrationName: illustrationTheme.illustration
  });

  // Teacher theme (various styles)
  const teacherTheme = getAllThemeByIndex(20) as any;
  console.log('Teacher Theme (index 20):', {
    type: teacherTheme.type,
    name: teacherTheme.name,
    hasBackground: !!teacherTheme.background
  });

  // 4. Font system check
  console.log('\n🔤 Font System:');
  console.log(`✅ Font categories: ${fontCategories.length}`);
  console.log(`✅ Total fonts available: ${getAllFonts().length}`);

  // 5. Theme distribution
  console.log('\n📊 Theme Distribution:');
  const themeCounts = {
    professional: 0,
    gradient: 0,
    illustration: 0,
    teacher: 0,
    other: 0
  };

  allCardThemes.forEach((theme, index) => {
    if (theme.type === 'professional') themeCounts.professional++;
    else if (theme.type === 'gradient') themeCounts.gradient++;
    else if (theme.type === 'illustration') themeCounts.illustration++;
    else if (theme.type === 'teacher') themeCounts.teacher++;
    else themeCounts.other++;
  });

  Object.entries(themeCounts).forEach(([type, count]) => {
    if (count > 0) {
      console.log(`  ${type}: ${count} themes`);
    }
  });

  // 6. Number badge styles check
  const badgeStyles = new Set();
  allCardThemes.forEach(theme => {
    if (theme.numberBadgeStyle) {
      badgeStyles.add(theme.numberBadgeStyle);
    }
  });
  console.log(`\n🔢 Number badge styles: ${Array.from(badgeStyles).join(', ')}`);

  console.log('\n✨ Theme system verification complete!');

  return {
    totalThemes: allCardThemes.length,
    categories: Object.keys(themeCategories),
    totalFonts: getAllFonts().length,
    themeCounts,
    badgeStyles: Array.from(badgeStyles)
  };
}

// Export for testing
export const themeSystemStatus = {
  isComplete: allCardThemes.length > 50,
  hasAllCategories: Object.keys(themeCategories).length >= 4,
  hasFontSystem: fontCategories.length > 0
};