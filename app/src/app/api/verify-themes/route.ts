import { NextResponse } from 'next/server';
import { verifyThemeSystem } from '@/lib/theme-verification';

export async function GET() {
  try {
    const verification = verifyThemeSystem();

    return NextResponse.json({
      success: true,
      verification,
      summary: {
        ready: verification.totalThemes >= 59,
        message: verification.totalThemes >= 59
          ? '✅ Theme system fully imported and ready!'
          : `⚠️ Only ${verification.totalThemes} themes found, expected 59+`
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}