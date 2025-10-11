import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  let browser;

  try {
    const body = await req.json();
    console.log('📄 Received PDF generation request');

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to A4 landscape
    await page.setViewport({
      width: 1190,
      height: 842,
      deviceScaleFactor: 2
    });

    // Build HTML with properly styled cards
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 297mm;
      height: 210mm;
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .page {
      width: 297mm;
      height: 210mm;
      position: relative;
      page-break-after: always;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    /* Cut lines */
    .page::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: 1px dashed #ccc;
      z-index: 1;
    }

    .page::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      border-left: 1px dashed #ccc;
      z-index: 1;
    }

    .card {
      width: 148.5mm;
      height: 105mm;
      position: relative;
      padding: 15mm;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .card-border {
      position: absolute;
      inset: 5mm;
      border: 2px solid #4a7fe6;
      border-radius: 12px;
      background: linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%);
      z-index: 0;
    }

    .card-number {
      position: absolute;
      top: 10mm;
      right: 10mm;
      width: 10mm;
      height: 10mm;
      background: #4a7fe6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14pt;
      z-index: 10;
    }

    .question-container {
      background: white;
      border-radius: 8px;
      padding: 8mm 12mm;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
      z-index: 5;
      max-width: 90%;
    }

    .question-text {
      font-size: 18pt;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      color: #333;
    }

    .character {
      position: absolute;
      left: 15mm;
      bottom: 15mm;
      font-size: 40pt;
      z-index: 10;
    }
  </style>
</head>
<body>
${generatePages(body)}
</body>
</html>`;

    // Set content and wait
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' }
    });

    await browser.close();

    // Return PDF
    const date = new Date().toISOString().split('T')[0];
    const filename = `Cartes-Eleve_${body.subject || 'general'}_${date}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    if (browser) await browser.close();

    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function generatePages(data: any): string {
  const cards = data.cards || [];
  const transforms = data.transforms || {};
  const showIllustrations = data.showIllustrations !== false;

  // Character emoji mapping
  const characterEmojis: Record<string, string> = {
    'cat': '🐱',
    'dog': '🐶',
    'chocolate': '🍫',
    'ghost': '👻',
    'octopus': '🐙',
    'duck': '🦆',
    'star': '⭐',
    'heart': '❤️'
  };

  const characterEmoji = characterEmojis[data.character] || '🐙';
  let pages = '';

  // Process cards in groups of 4
  for (let i = 0; i < cards.length; i += 4) {
    pages += '<div class="page">';

    for (let j = 0; j < 4; j++) {
      const index = i + j;
      if (index < cards.length) {
        const card = cards[index];
        const transform = transforms[index] || {};

        pages += `
          <div class="card">
            <div class="card-border"></div>
            <div class="card-number">${index + 1}</div>
            <div class="question-container">
              <div class="question-text">${card.question || ''}</div>
            </div>
            ${showIllustrations ? `<div class="character">${characterEmoji}</div>` : ''}
          </div>
        `;
      } else {
        pages += '<div class="card"></div>';
      }
    }

    pages += '</div>';
  }

  return pages;
}