'use client';

import { useEffect, useState } from 'react';
import { useSessionToken } from '@/components/session-token-context';

function isValidUrl(value: string) {
  return !value || /^(https?:\/\/).+/i.test(value);
}

export function ProfileForm() {
  const { token, user } = useSessionToken();
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ fullName: '', avatarUrl: '' });

  useEffect(() => {
    if (!token || !user) return;

    async function loadProfile() {
      try {
        const res = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Unable to load profile.');
        setFullName(data.profile?.full_name ?? '');
        setAvatarUrl(data.profile?.avatar_url ?? '');
        setEmail(data.profile?.email ?? user.email ?? '');
      } catch (err) {
        setMessage((err as Error).message);
      }
    }

    loadProfile();
  }, [token, user]);

  if (!user) {
    return <p className="text-sm text-slate-600">Sign in to manage your profile.</p>;
  }

  function validateProfile() {
    const nextErrors = {
      fullName: fullName.trim().length >= 2 ? '' : 'Please enter your full name.',
      avatarUrl: isValidUrl(avatarUrl.trim()) ? '' : 'Please enter a valid image URL.',
    };

    setFieldErrors(nextErrors);
    return !nextErrors.fullName && !nextErrors.avatarUrl;
  }

  function handleFullNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFullName(value);
    setFieldErrors((current) => ({ ...current, fullName: value.trim().length >= 2 ? '' : 'Please enter your full name.' }));
  }

  function handleAvatarUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setAvatarUrl(value);
    setFieldErrors((current) => ({ ...current, avatarUrl: isValidUrl(value.trim()) ? '' : 'Please enter a valid image URL.' }));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!token || !validateProfile()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: fullName.trim(), avatarUrl: avatarUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to update profile.');
      setMessage('Profile saved successfully.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage('Please choose an image smaller than 2MB.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to upload avatar.');
      setAvatarUrl(data.avatarUrl);
      setMessage('Avatar uploaded successfully.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const avatarPreview =
    avatarUrl && avatarUrl.startsWith('http') ? (
      <div className="mb-6 flex items-center gap-4">
        <img
          src={avatarUrl}
          alt="Avatar preview"
          className="h-20 w-20 rounded-full border border-slate-200 object-cover"
        />
        <p className="text-sm text-slate-600">Current avatar preview</p>
      </div>
    ) : null;

  return (
    <form className="space-y-6" onSubmit={handleSave}>
      <div>
        <label className="text-sm font-semibold text-slate-900">Email</label>
        <p className="mt-2 text-sm text-slate-600">{email}</p>
      </div>
      <div>
        <label htmlFor="fullName" className="text-sm font-semibold text-slate-900">
          Full name
        </label>
        <input
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Your full name"
          aria-invalid={Boolean(fieldErrors.fullName)}
          className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.fullName ? 'border-red-400' : 'border-slate-200'}`}
        />
        {fieldErrors.fullName ? <p className="mt-2 text-sm text-red-600">{fieldErrors.fullName}</p> : null}
      </div>
      <div>
        <label htmlFor="avatarUrl" className="text-sm font-semibold text-slate-900">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          placeholder="https://..."
          aria-invalid={Boolean(fieldErrors.avatarUrl)}
          className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.avatarUrl ? 'border-red-400' : 'border-slate-200'}`}
        />
        {fieldErrors.avatarUrl ? <p className="mt-2 text-sm text-red-600">{fieldErrors.avatarUrl}</p> : null}
      </div>
      {avatarPreview}
      <div>
        <label className="text-sm font-semibold text-slate-900">Upload avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="mt-3 block text-sm text-slate-600"
        />
      </div>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Saving…' : 'Save profile'}
      </button>
    </form>
  );
}
