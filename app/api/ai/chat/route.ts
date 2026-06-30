import { NextResponse } from 'next/server';
import { mockChatResponse } from '@/lib/ai-fallback';
import { groqChat } from '@/lib/openai';

export async function POST(request: Request) {
  const body = await request.json();
  const message = body.message?.trim() || '';

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ answer: mockChatResponse(message), fallback: true }, { status: 200 });
  }

  try {
    const answer = await groqChat(`A customer asks: ${message}`);
    if (!answer) {
      return NextResponse.json({ answer: mockChatResponse(message), fallback: true, error: 'AI service returned no text.' }, { status: 200 });
    }
    return NextResponse.json({ answer });
  } catch (error) {
    const fallback = mockChatResponse(message);
    const errorMessage = error instanceof Error ? error.message : 'Unable to connect to the AI service.';
    return NextResponse.json({ answer: fallback, fallback: true, error: errorMessage }, { status: 200 });
  }
}
