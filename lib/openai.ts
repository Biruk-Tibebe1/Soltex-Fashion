const GROQ_URL = 'https://api.groq.ai/v1/completions';

export async function groqChat(prompt: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured.');
  }

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'groq2',
      input: prompt,
      temperature: 0.8,
      max_output_tokens: 250,
    }),
  });

  const data = await response.json();
  const output = data?.output;
  if (Array.isArray(output)) {
    return output.join('').trim();
  }
  if (typeof output === 'string') {
    return output.trim();
  }
  return null;
}
