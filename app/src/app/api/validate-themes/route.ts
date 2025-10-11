import { NextResponse } from 'next/server';
import { allCardThemes } from '@/lib/themes/all-card-themes';

export async function GET() {
  try {
    // Validate all themes have required properties
    const validationResults = allCardThemes.map((theme: any, index) => {
      const isProfessional = theme.type === 'professional';
      const isFun = theme.type === 'fun';

      // Check basic required properties
      const hasName = !!theme.name;
      const hasType = !!theme.type;

      // Professional theme checks
      const professionalChecks = isProfessional ? {
        hasPrimary: !!(theme as any).primary,
        hasSecondary: !!(theme as any).secondary,
        hasPattern: !!(theme as any).pattern,
        hasNumberBadgeStyle: !!(theme as any).numberBadgeStyle,
        hasNumberBadgeBackground: !!(theme as any).numberBadgeBackground,
        hasNumberBadgeColor: !!(theme as any).numberBadgeColor,
      } : null;

      // Fun theme checks
      const funChecks = isFun ? {
        hasBackground: !!(theme as any).background,
        hasCardBorder: !!(theme as any).cardBorder,
        hasNumberBadgeStyle: !!(theme as any).numberBadgeStyle,
        hasNumberBadgeBackground: !!(theme as any).numberBadgeBackground,
        hasDecorations: !!(theme as any).decorations,
      } : null;

      return {
        index,
        name: theme.name,
        type: theme.type,
        isValid: hasName && hasType,
        checks: {
          hasName,
          hasType,
          ...(isProfessional ? { professional: professionalChecks } : {}),
          ...(isFun ? { fun: funChecks } : {})
        }
      };
    });

    // Summary
    const summary = {
      totalThemes: allCardThemes.length,
      professionalThemes: allCardThemes.filter((t: any) => t.type === 'professional').length,
      funThemes: allCardThemes.filter((t: any) => t.type === 'fun').length,
      allValid: validationResults.every(r => r.isValid),
      themes: validationResults
    };

    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to validate themes',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}