// DALL-E API Image Generation Endpoint
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, size = '1024x1024', quality = 'standard', style = 'vivid' } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if API key exists
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('Generating DALL-E image with prompt:', prompt);

    // Call OpenAI DALL-E 3 API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1, // DALL-E 3 only supports n=1
        size: size,
        quality: quality,
        style: style,
        response_format: 'b64_json' // Return base64 for easier handling
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('DALL-E API error:', errorData);

      // Check for specific error types
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      if (response.status === 400 && errorData.error?.message?.includes('billing')) {
        return NextResponse.json(
          { error: 'OpenAI account has insufficient credits. Please add billing.' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to generate image' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // DALL-E 3 returns enhanced prompt along with the image
    const result = {
      image: `data:image/png;base64,${data.data[0].b64_json}`,
      revised_prompt: data.data[0].revised_prompt || prompt
    };

    console.log('Successfully generated DALL-E image');

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Error generating DALL-E image:', error);

    // Network or other errors
    if (error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { error: 'Cannot connect to OpenAI API. Check internet connection.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}