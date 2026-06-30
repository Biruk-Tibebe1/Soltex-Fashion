'use client';

import { useState } from 'react';

export function AiStylist() {
  const [prompt, setPrompt] = useState('Casual weekend outfit');
  const [response, setResponse] = useState('Describe a look and I will recommend pieces.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promptError, setPromptError] = useState('');

  function validatePrompt(value: string) {
    return value.trim().length >= 6 ? '' : 'Please describe your outfit in a bit more detail.';
  }

  function handlePromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setPrompt(value);
    setPromptError(validatePrompt(value));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validatePrompt(prompt);
    setPromptError(nextError);

    if (nextError) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preference: prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to get recommendations.');
        return;
      }
      setResponse(data.recommendation);
    } catch (err) {
      setError('Unable to connect to the stylist assistant.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-16 rounded-[2rem] bg-white/90 p-8 shadow-soft md:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">AI Personal Stylist</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Get outfit recommendations from the catalog
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
            Tell the stylist what you need — occasion, weather, or style mood — and receive a curated thrift outfit suggestion.
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-900">Describe your look</label>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              rows={4}
              aria-invalid={Boolean(promptError)}
              className={`w-full rounded-3xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 ${promptError ? 'border-red-400' : 'border-slate-200'}`}
            />
            {promptError ? <p className="text-sm text-red-600">{promptError}</p> : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Get recommendations'}
            </button>
          </form>
          <div className="mt-6 rounded-[1.75rem] bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
            <p className="font-semibold text-slate-950">Recommendation</p>
            <p className="mt-3 whitespace-pre-line">{error || response}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
