import { NextResponse } from 'next/server';
import { mockStylistRecommendation } from '@/lib/ai-fallback';
import { groqChat } from '@/lib/openai';

export async function POST(request: Request) {
  const { preference } = await request.json();

  if (!preference || typeof preference !== 'string') {
    return NextResponse.json({ error: 'Preference is required.' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ recommendation: mockStylistRecommendation(preference), fallback: true }, { status: 200 });
  }

  try {
    const recommendation = await groqChat(`Recommend a complete outfit using thrift fashion pieces for: ${preference}`);
    if (!recommendation) {
      return NextResponse.json({ recommendation: mockStylistRecommendation(preference), fallback: true, error: 'AI service returned no recommendation.' }, { status: 200 });
    }
    return NextResponse.json({ recommendation });
  } catch (error) {
    const fallback = mockStylistRecommendation(preference);
    const errorMessage = error instanceof Error ? error.message : 'Unable to connect to the AI service.';
    return NextResponse.json({ recommendation: fallback, fallback: true, error: errorMessage }, { status: 200 });
  }
}
