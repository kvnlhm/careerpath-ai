import replicate from 'replicate';
import { NextResponse } from 'next/server';

// Initialize Replicate client with the API token from environment variables
const replicateClient = new replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  try {
    const { q1, q2 } = await request.json();

    if (!q1 || !q2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const promptText = `Berdasarkan data berikut, berikan rekomendasi jurusan kuliah dan pekerjaan yang cocok untuk saya:\n\n`
      + `Mata pelajaran favorit: ${q1}\n`
      + `Hobi dan kegiatan: ${q2}\n\n`
      + `Format jawaban harus ringkas dan jelas.`;

    const output = await replicateClient.run(
      "ibm-granite/granite-3.3-8b-instruct:3ff9e6e20ff1f31263bf4f36c242bd9be1acb2025122daeefe2b06e883df0996",
      {
        input: {
          prompt: promptText,
          max_tokens: 1000,
        },
      }
    );

    const resultText = output.join('');
    return NextResponse.json({ result: resultText }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    
    let errorMessage = "An internal server error occurred.";
    if (error.status === 403) {
      errorMessage = "Authentication failed. Please check your Replicate API token.";
    }

    return NextResponse.json({ error: errorMessage }, { status: error.status || 500 });
  }
}
