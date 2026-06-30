'use client';

import { useState } from 'react';

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Hi there! Ask me for styling tips or product help.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSend() {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError('Please enter a question before sending.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "I'm sorry, something went wrong.");
      } else {
        setReply(data.answer || 'Sorry, I could not respond.');
        if (data.fallback) {
          setSuccess('Using local AI fallback — works without an API key.');
        }
      }
    } catch (err) {
      setError('Unable to contact the AI service.');
    } finally {
      setLoading(false);
      setMessage('');
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[320px] rounded-[2rem] border border-[#e8dfd2] bg-white shadow-soft">
          <div className="flex items-center justify-between rounded-t-[2rem] bg-[#8a9a7b] px-5 py-4 text-white">
            <div>
              <p className="font-semibold">Style Assistant</p>
              <p className="text-xs text-brand-100">AI styling and product help</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-sm font-semibold text-[#f5f0e8]">Close</button>
          </div>
          <div className="space-y-4 p-5 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-900">{reply}</div>
            {success ? <div className="rounded-3xl bg-green-50 p-3 text-sm text-green-700">{success}</div> : null}
            {error ? <div className="rounded-3xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              placeholder="Ask about outfits, sizes, or styling"
              className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
            />
            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              className="w-full rounded-full bg-[#8a9a7b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7a8a6b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Thinking...' : 'Send message'}
            </button>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-3 rounded-full bg-[#8a9a7b] px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-[#7a8a6b]"
      >
        {open ? 'Close assistant' : 'Chat with AI'}
      </button>
    </div>
  );
}
