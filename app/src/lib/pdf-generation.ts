/**
 * PDF Generation Utilities
 * Extracted from generator page to reduce file size for Turbopack
 */

import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toast } from 'sonner';

export interface PDFGenerationOptions {
  selectedSubject: string;
  generatedCards: any[];
  displayMode: 'studentCards' | 'answerSheet' | 'corriger';
}

export interface DrillSheetPDFOptions {
  selectedSubject: string;
  selectedNotion: string;
  showAnswers: boolean;
}

/**
 * Generate PDF for student cards (2x2 grid, A4 landscape)
 */
export async function generateStudentCardsPDF(options: PDFGenerationOptions) {
  try {
    console.log('📄 Starting PDF generation with html2canvas...');

    // Ensure all fonts are loaded before capturing
    console.log('⏳ Waiting for fonts to load...');
    await document.fonts.ready;
    console.log('✅ All fonts loaded and applied');

    // Find ALL cards
    const allCards = Array.from(document.querySelectorAll('[data-card-id]')) as HTMLElement[];

    if (allCards.length === 0) {
      throw new Error('No cards found to export');
    }

    console.log('📦 Found cards:', allCards.length);

    // Create PDF in A4 landscape format
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // A4 landscape dimensions: 297mm x 210mm
    const pdfWidth = 297;
    const pdfHeight = 210;

    // Card dimensions for 2x2 grid
    const cardWidth = pdfWidth / 2;
    const cardHeight = pdfHeight / 2;

    // Process cards in groups of 4 (2x2 grid per page)
    const cardsPerPage = 4;
    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    console.log(`📄 Generating ${totalPages} pages for ${allCards.length} cards...`);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      // Add new page (except for first page)
      if (pageIndex > 0) {
        pdf.addPage();
      }

      console.log(`📄 Processing page ${pageIndex + 1}/${totalPages}...`);

      // Get cards for this page (up to 4)
      const startCardIndex = pageIndex * cardsPerPage;
      const endCardIndex = Math.min(startCardIndex + cardsPerPage, allCards.length);
      const pageCards = allCards.slice(startCardIndex, endCardIndex);

      // Capture and place each card in 2x2 grid
      for (let i = 0; i < pageCards.length; i++) {
        const card = pageCards[i];
        const row = Math.floor(i / 2); // 0 or 1
        const col = i % 2; // 0 or 1

        console.log(`📸 Capturing card ${startCardIndex + i + 1}/${allCards.length}...`);

        // Inline ALL font-related styles to ensure they're captured
        const textElements = card.querySelectorAll('*');
        const originalStyles: {
          element: HTMLElement;
          fontFamily: string;
          fontWeight: string;
          fontSize: string;
          lineHeight: string;
          letterSpacing: string;
        }[] = [];

        textElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          const computed = window.getComputedStyle(htmlEl);

          // Store original inline styles
          originalStyles.push({
            element: htmlEl,
            fontFamily: htmlEl.style.fontFamily,
            fontWeight: htmlEl.style.fontWeight,
            fontSize: htmlEl.style.fontSize,
            lineHeight: htmlEl.style.lineHeight,
            letterSpacing: htmlEl.style.letterSpacing,
          });

          // Apply ALL computed font styles inline
          if (computed.fontFamily) htmlEl.style.fontFamily = computed.fontFamily;
          if (computed.fontWeight) htmlEl.style.fontWeight = computed.fontWeight;
          if (computed.fontSize) htmlEl.style.fontSize = computed.fontSize;
          if (computed.lineHeight) htmlEl.style.lineHeight = computed.lineHeight;
          if (computed.letterSpacing) htmlEl.style.letterSpacing = computed.letterSpacing;
        });

        // Capture card - silence console during capture
        const originalConsole = {
          error: console.error,
          warn: console.warn,
          log: console.log
        };
        console.error = () => {};
        console.warn = () => {};
        console.log = () => {};

        let blob: Blob | null = null;

        try {
          const dataUrl = await htmlToImage.toPng(card, {
            quality: 1,
            width: card.offsetWidth,
            height: card.offsetHeight,
            cacheBust: true,
            pixelRatio: 2,
            style: {
              WebkitFontSmoothing: 'antialiased',
            } as any
          });

          const response = await fetch(dataUrl);
          blob = await response.blob();
        } catch (err) {
          blob = null;
        }

        // Restore console
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.log = originalConsole.log;

        if (!blob) {
          throw new Error(`Failed to capture card ${startCardIndex + i + 1}`);
        }

        // Restore original font styles
        originalStyles.forEach(({ element, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing }) => {
          if (fontFamily) element.style.fontFamily = fontFamily;
          else element.style.removeProperty('font-family');
          if (fontWeight) element.style.fontWeight = fontWeight;
          else element.style.removeProperty('font-weight');
          if (fontSize) element.style.fontSize = fontSize;
          else element.style.removeProperty('font-size');
          if (lineHeight) element.style.lineHeight = lineHeight;
          else element.style.removeProperty('line-height');
          if (letterSpacing) element.style.letterSpacing = letterSpacing;
          else element.style.removeProperty('letter-spacing');
        });

        // Convert blob to data URL
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        // Calculate position in 2x2 grid
        const xPos = col * cardWidth;
        const yPos = row * cardHeight;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', xPos, yPos, cardWidth, cardHeight);
      }
    }

    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = `cartes-${options.selectedSubject}-${timestamp}.pdf`;
    pdf.save(filename);

    console.log('✅ PDF downloaded successfully');
    toast.success('PDF généré avec succès!', {
      description: `${allCards.length} carte(s) exportée(s) sur ${totalPages} page(s)`
    });

    return true;
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    toast.error('Erreur lors de la génération du PDF', {
      description: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
      duration: 5000
    });
    return false;
  }
}

/**
 * Generate PDF for answer sheet or corrigé (full A4 pages)
 */
export async function generateAnswerSheetPDF(options: PDFGenerationOptions) {
  try {
    const isCorrige = options.displayMode === 'corriger';
    console.log(`📄 Starting ${isCorrige ? 'corrigé' : 'answer sheet'} PDF generation...`);

    await new Promise(resolve => setTimeout(resolve, 300));

    // Find all A4 landscape pages
    const allPages = Array.from(document.querySelectorAll('.print-page')) as HTMLElement[];

    if (allPages.length === 0) {
      throw new Error(`No ${isCorrige ? 'corrigé' : 'answer sheet'} pages found`);
    }

    console.log(`📦 Found ${allPages.length} page(s)`);

    // Create PDF in A4 landscape format
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = 297;
    const pdfHeight = 210;

    // Silence console
    const originalConsole = {
      error: console.error,
      warn: console.warn,
      log: console.log
    };
    console.error = () => {};
    console.warn = () => {};
    console.log = () => {};

    // Capture each page
    for (let pageIndex = 0; pageIndex < allPages.length; pageIndex++) {
      const page = allPages[pageIndex];

      if (pageIndex > 0) {
        pdf.addPage();
      }

      const dataUrl = await htmlToImage.toPng(page, {
        quality: 1,
        width: page.offsetWidth,
        height: page.offsetHeight,
        cacheBust: true,
        pixelRatio: 2,
      });

      if (!dataUrl) {
        throw new Error(`Failed to capture page ${pageIndex + 1}`);
      }

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    // Restore console
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.log = originalConsole.log;

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = isCorrige
      ? `corrige-${options.selectedSubject}-${timestamp}.pdf`
      : `feuille-reponses-${options.selectedSubject}-${timestamp}.pdf`;

    pdf.save(filename);

    console.log(`✅ ${isCorrige ? 'Corrigé' : 'Answer sheet'} PDF downloaded`);
    toast.success(isCorrige ? 'Corrigé généré!' : 'Feuille de réponses générée!', {
      description: `${allPages.length} page(s) exportée(s)`
    });

    return true;
  } catch (error) {
    console.error('❌ PDF generation error:', error);
    toast.error('Erreur lors de la génération', {
      description: error instanceof Error ? error.message : 'Une erreur est survenue',
      duration: 5000
    });
    return false;
  }
}

/**
 * Generate PDF for drill sheet (A4 portrait, multiple pages)
 */
export async function generateDrillSheetPDF(options: DrillSheetPDFOptions) {
  try {
    const { selectedSubject, selectedNotion, showAnswers } = options;
    console.log(`📄 Starting drill sheet PDF generation (${showAnswers ? 'with answers' : 'exercises only'})...`);

    // Wait for fonts to load
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find all drill sheet pages (each .print-page is one A4 page)
    const allPages = Array.from(document.querySelectorAll('.drill-sheet-container .print-page')) as HTMLElement[];

    if (allPages.length === 0) {
      throw new Error('No drill sheet pages found. Please generate a drill sheet first.');
    }

    console.log(`📦 Found ${allPages.length} drill sheet page(s)`);

    // Create PDF in A4 portrait format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // A4 portrait dimensions: 210mm x 297mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Wait for fonts to load before capturing
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
      console.log('✅ Fonts loaded and ready');
    }

    // Intercept Google Fonts fetches to prevent CORS errors
    // html-to-image tries to fetch Google Fonts CSS, which fails due to CORS
    // We intercept and return empty CSS since fonts are already loaded in DOM
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = args[0]?.toString() || '';
      if (url.includes('fonts.googleapis.com')) {
        // Return empty CSS response for Google Fonts (fonts already loaded)
        return new Response('/* fonts already loaded */', {
          status: 200,
          headers: { 'Content-Type': 'text/css' }
        });
      }
      return originalFetch(...args);
    };

    // Silence console during capture
    const originalConsole = {
      error: console.error,
      warn: console.warn,
      log: console.log
    };
    console.error = () => {};
    console.warn = () => {};
    console.log = () => {};

    // Capture each page separately
    for (let pageIndex = 0; pageIndex < allPages.length; pageIndex++) {
      const page = allPages[pageIndex];

      // Add new page (except for first page)
      if (pageIndex > 0) {
        pdf.addPage();
      }

      console.log(`📸 Capturing page ${pageIndex + 1}/${allPages.length}...`);

      // Capture the page as JPEG for much smaller file size
      const dataUrl = await htmlToImage.toJpeg(page, {
        quality: 0.92,  // High quality JPEG (balance between quality and size)
        width: page.offsetWidth,
        height: page.offsetHeight,
        cacheBust: true,
        pixelRatio: 1,  // Normal resolution (reduced from 2 to save 75% file size)
        backgroundColor: '#ffffff',  // White background for JPEG
        // Note: We don't skip fonts here - html-to-image will try to embed them
        // This causes CORS errors (Google Fonts blocks cross-origin CSS fetching)
        // BUT the fonts still work because they're already loaded in the DOM
        // The CORS errors are suppressed by console.error = () => {} above
        style: {
          WebkitFontSmoothing: 'antialiased',
        } as any
      });

      if (!dataUrl) {
        throw new Error(`Failed to capture page ${pageIndex + 1}`);
      }

      // Add image to PDF, fitting to A4 portrait
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    // Restore console and fetch
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.log = originalConsole.log;
    window.fetch = originalFetch;

    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const answerSuffix = showAnswers ? '-corrige' : '';
    const filename = `fiche-exercices-${selectedSubject}-${selectedNotion}${answerSuffix}-${timestamp}.pdf`;

    pdf.save(filename);

    console.log('✅ Drill sheet PDF downloaded successfully');
    toast.success(showAnswers ? 'Corrigé généré!' : 'Fiche d\'exercices générée!', {
      description: `${allPages.length} page(s) exportée(s)`
    });

    return true;
  } catch (error) {
    console.error('❌ Drill sheet PDF generation error:', error);
    toast.error('Erreur lors de la génération du PDF', {
      description: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
      duration: 5000
    });
    return false;
  }
}
