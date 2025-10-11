// Save DALL-E images to the file system
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images, themeName } = body;

    if (!images || !themeName) {
      return NextResponse.json(
        { error: 'Images and theme name are required' },
        { status: 400 }
      );
    }

    // Create directory for this theme
    const publicPath = path.join(process.cwd(), 'public', 'dalle-images');
    const themePath = path.join(publicPath, themeName.replace(/[^a-zA-Z0-9]/g, '-'));

    await mkdir(themePath, { recursive: true });

    const savedImages: { [key: string]: string } = {};

    // Save each image
    for (const [key, dataUrl] of Object.entries(images)) {
      if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image')) {
        console.log(`Skipping ${key}: not a valid data URL`);
        continue;
      }

      // Extract base64 data from data URL
      const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Generate filename
      const filename = `${key}.png`;
      const filepath = path.join(themePath, filename);

      // Write file
      await writeFile(filepath, buffer);

      // Store public URL
      savedImages[key] = `/dalle-images/${themeName.replace(/[^a-zA-Z0-9]/g, '-')}/${filename}`;
      console.log(`Saved image: ${filename}`);
    }

    return NextResponse.json({
      success: true,
      savedImages,
      message: `Saved ${Object.keys(savedImages).length} images for theme: ${themeName}`
    });

  } catch (error: any) {
    console.error('Error saving DALL-E images:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save images' },
      { status: 500 }
    );
  }
}