import { NextResponse } from 'next/server';
import { allCardThemes, getAllThemeByIndex } from '@/lib/themes/all-card-themes';

export async function GET() {
  const themes = allCardThemes.map((theme: any, index: number) => ({
    index,
    name: theme.name || `Theme ${index}`,
    type: theme.type || 'unknown'
  }));

  const breakdown = {
    professional: themes.filter((t: any) => t.type === 'professional').length,
    gradient: themes.filter((t: any) => t.type === 'gradient').length,
    pastel: themes.filter((t: any) => t.type === 'pastel').length,
    illustration: themes.filter((t: any) => t.type === 'illustration').length,
    teacher: themes.filter((t: any) => t.type === 'teacher').length,
    unknown: themes.filter((t: any) => t.type === 'unknown').length,
  };

  return NextResponse.json({
    total: allCardThemes.length,
    breakdown,
    first10: themes.slice(0, 10),
    transition: themes.slice(17, 23),  // Around where original ends and teacher begins
    last5: themes.slice(-5)
  });
}