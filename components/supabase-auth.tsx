'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SupabaseAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');
  const [emailError, setEmailError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    const client = supabase;

    const getSession = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (!supabase) {
    return (
      <div className="rounded-[2rem] border border-yellow-300 bg-yellow-50 p-8 text-sm text-slate-800">
        <p className="font-semibold">Authentication not configured</p>
        <p className="mt-3">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.</p>
      </div>
    );
  }

  const client = supabase;

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
    setEmailError(isValidEmail(value.trim()) ? '' : 'Please enter a valid email address.');
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleAuth() {
    if (!client) return;
    if (!isValidEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (authMode === 'signUp' && !password.trim()) {
      setMessage('Please enter a password to create your account.');
      return;
    }

    setLoading(true);
    setMessage('');

    if (authMode === 'signUp') {
      const { error } = await client.auth.signUp({ email: email.trim(), password: password.trim() });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Account created. Check your email to confirm and then sign in.');
      }
    } else if (password.trim()) {
      const { error } = await client.auth.signInWithPassword({ email: email.trim(), password: password.trim() });
      if (error) {
        setMessage(error.message);
      }
    } else {
      const { error } = await client.auth.signInWithOtp({ email: email.trim() });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Check your inbox for a magic link.');
      }
    }

    setLoading(false);
  }

  async function handleSignOut() {
    if (!client) return;
    await client.auth.signOut();
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="rounded-[2rem] border border-yellow-300 bg-yellow-50 p-8 text-sm text-slate-800">
        <p className="font-semibold">Authentication not configured</p>
        <p className="mt-3">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
      {user ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Signed in as <span className="font-semibold text-slate-900">{user.email}</span>.
          </p>
          <button
            onClick={handleSignOut}
            className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-base font-semibold text-slate-950">Sign in or register with your email</p>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(emailError)}
            className={`w-full rounded-3xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${emailError ? 'border-red-400' : 'border-slate-200'}`}
          />
          {emailError ? <p className="text-sm text-red-600">{emailError}</p> : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-900">Password</label>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter password"
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400"
            />
          </div>

          <button
            onClick={handleAuth}
            disabled={loading || !email || Boolean(emailError)}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Processing…' : authMode === 'signUp' ? 'Create account' : password.trim() ? 'Sign in with password' : 'Send magic link'}
          </button>

          <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
            <p>{authMode === 'signIn' ? 'Need an account?' : 'Already registered?'}</p>
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')}
              className="font-semibold text-brand-700 hover:text-brand-900"
            >
              {authMode === 'signIn' ? 'Create one' : 'Use magic link'}
            </button>
          </div>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </div>
      )}
    </div>
  );
}
