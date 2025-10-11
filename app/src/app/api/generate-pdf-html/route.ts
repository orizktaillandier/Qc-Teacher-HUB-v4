import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  let browser;

  try {
    const { html, cardsCount, fontFamily } = await req.json();

    console.log('📥 PDF HTML Generator received:', {
      htmlLength: html?.length,
      cardsCount: cardsCount,
      fontFamily: fontFamily
    });

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

    // Create full HTML document with the captured content
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=${fontFamily?.replace(' ', '+')}:wght@400;700&display=swap');

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
      margin: 0;
      padding: 0;
      font-family: '${fontFamily || 'Inter'}', system-ui, -apple-system, sans-serif;
    }

    .pdf-page {
      width: 297mm;
      height: 210mm;
      position: relative;
      page-break-after: always;
      page-break-inside: avoid;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 0;
    }

    /* Don't add page break after last page */
    .pdf-page:last-child {
      page-break-after: avoid !important;
    }

    /* Cut lines */
    .pdf-page::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      border-top: 1px dashed #ccc;
      z-index: 100;
    }

    .pdf-page::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      border-left: 1px dashed #ccc;
      z-index: 100;
    }

    /* Each card cell */
    .pdf-page > div {
      width: 148.5mm;
      height: 105mm;
      position: relative;
      overflow: visible; /* Changed from hidden to visible for illustrations */
    }

    /* Ensure cards have relative positioning */
    [data-card-id] {
      position: relative !important;
    }

    /* Preserve all original styles from captured HTML */
    .card-illustration {
      /* Don't override inline positioning styles */
    }

    /* Ensure SVGs and images render properly */
    svg, img {
      display: block;
      overflow: visible;
      max-width: none !important;
    }

    /* Ensure images are not hidden */
    img {
      opacity: 1 !important;
      visibility: visible !important;
    }

    /* Preserve draggable illustration transforms */
    .draggable-illustration {
      /* Use inline styles from HTML */
    }

    /* Ensure illustration wrapper displays correctly */
    .illustration-wrapper {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* Force font inheritance in question containers */
    [class*="question"], .question-text, .text-content {
      font-family: inherit !important;
    }

    /* Ensure SVGs and illustrations are visible */
    svg, .card-illustration, .draggable-illustration, .illustration-wrapper {
      opacity: 1 !important;
      visibility: visible !important;
    }

    /* Debug: Add border to see if illustrations are present */
    .card-illustration {
      /* border: 2px solid red !important; */
    }

  </style>
</head>
<body>
  ${html}
</body>
</html>`;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Wait for fonts and images to fully load
    await page.evaluateHandle('document.fonts.ready');

    // Wait for SVGs and content to render
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        // Check for SVGs
        const svgs = document.querySelectorAll('svg');
        console.log('PDF: Found', svgs.length, 'SVGs in document');

        if (svgs.length > 0) {
          const firstSvg = svgs[0];
          console.log('PDF: First SVG details:', {
            width: firstSvg.getAttribute('width'),
            height: firstSvg.getAttribute('height'),
            viewBox: firstSvg.getAttribute('viewBox'),
            xmlns: firstSvg.getAttribute('xmlns')
          });
        }

        // Check for images
        const images = document.querySelectorAll('img');
        console.log('PDF: Found', images.length, 'images in document');

        // Give time for everything to render
        setTimeout(() => resolve(), 3000);
      });
    });

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
        'Content-Disposition': `attachment; filename="cards-kawaii.pdf"`
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    if (browser) await browser.close();
    return NextResponse.json({
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}