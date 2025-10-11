import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { getKawaiiSVG } from '@/lib/kawaii-svgs';

export async function POST(req: NextRequest) {
  let browser;

  try {
    const data = await req.json();

    console.log('📥 PDF Generator received:', {
      cardsCount: data.cards?.length,
      character: data.character,
      transforms: data.transforms,
      showIllustrations: data.showIllustrations,
      firstCard: data.cards?.[0]
    });

    // Character mapping - matches KawaiiSelector exactly
    const characters: Record<string, string> = {
      'cat': '🐱',
      'ghost': '👻',
      'icecream': '🍦',
      'planet': '🪐',
      'backpack': '🎒',
      'mug': '☕',
      'browser': '💻',
      'chocolate': '🍫',
      'file': '📄',
      'creditcard': '💳',
      'speechbubble': '💬',
      'astronaut': '🚀',
      'cyborg': '🤖',
      'folder': '📁',
      'humancat': '🐱👤',
      'humandinosaur': '🦕'
    };

    // Get the actual SVG for the character
    const selectedSVG = getKawaiiSVG(data.character);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1190, height: 842 });

    // Simple HTML that matches your exact card design
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      width: 297mm;
      height: 210mm;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .page {
      width: 297mm;
      height: 210mm;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      page-break-after: always;
    }

    .card {
      width: 148.5mm;
      height: 105mm;
      padding: 10mm;
      position: relative;
      border: 2px solid #93c5fd;
      background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
    }

    .number {
      position: absolute;
      top: 8mm;
      right: 8mm;
      width: 12mm;
      height: 12mm;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16pt;
    }

    .question-box {
      background: white;
      border-radius: 12px;
      padding: 10mm 15mm;
      margin-top: 20mm;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .question {
      font-size: 20pt;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      color: #1f2937;
    }

    .character {
      position: absolute;
      left: 12mm;
      bottom: 8mm;
      width: 60px;
      height: 60px;
      transform: rotate(-15deg);
      z-index: 10;
    }

    .character svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>
<body>
  <div class="page">
    ${data.cards.slice(0, 4).map((card: any, i: number) => `
      <div class="card">
        <div class="number">${i + 1}</div>
        <div class="question-box">
          <div class="question">${card.question}</div>
        </div>
        <div class="character">${selectedSVG}</div>
      </div>
    `).join('')}
  </div>
  ${data.cards.length > 4 ? `
  <div class="page">
    ${data.cards.slice(4, 8).map((card: any, i: number) => `
      <div class="card">
        <div class="number">${i + 5}</div>
        <div class="question-box">
          <div class="question">${card.question}</div>
        </div>
        <div class="character">${selectedSVG}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="cards-simple.pdf"`
      }
    });

  } catch (error) {
    if (browser) await browser.close();
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}