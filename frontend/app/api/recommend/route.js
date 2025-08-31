import Replicate from 'replicate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Check if API token is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error('REPLICATE_API_TOKEN is not configured');
      return NextResponse.json({ 
        error: "Replicate API token is not configured. Please check your environment variables." 
      }, { status: 500 });
    }

    const { q1, q2 } = await request.json();

    if (!q1 || !q2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Enhanced prompt for better career recommendations
    const promptText = `Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n`
      + `Mata pelajaran favorit: ${q1}\n`
      + `Hobi dan kegiatan: ${q2}\n\n`
      + `Berikan rekomendasi dalam format berikut:\n`
      + `1. Jurusan Kuliah (3-5 rekomendasi)\n`
      + `2. Pekerjaan/Karir (3-5 rekomendasi)\n`
      + `3. Alasan rekomendasi (singkat)\n\n`
      + `Format jawaban harus ringkas, jelas, dan mudah dibaca.`;

    console.log('Sending request to Replicate with prompt:', promptText);

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
      {
        input: {
          prompt: promptText,
          max_tokens: 1500,
          temperature: 0.7,
        },
      }
    );

    console.log('Replicate response:', output);

    const resultText = Array.isArray(output) ? output.join('') : output;
    
    // Validate the response
    if (!resultText || resultText.trim().length === 0) {
      throw new Error('Empty response from AI model');
    }
    
    return NextResponse.json({ result: resultText }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    
    let errorMessage = "Terjadi kesalahan dalam memproses permintaan Anda.";
    let statusCode = 500;

    if (error.status === 403) {
      errorMessage = "Gagal autentikasi. Silakan periksa API token Replicate Anda.";
      statusCode = 403;
    } else if (error.status === 429) {
      errorMessage = "Terlalu banyak permintaan. Silakan coba lagi dalam beberapa saat.";
      statusCode = 429;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}