'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart-context';
import { useSessionToken } from '@/components/session-token-context';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const { token } = useSessionToken();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', phone: '', address: '' });
  const countryCode = '+251';

  function validatePhone(value: string) {
    return /^[7|9]\d{2}[-\s]?\d{3}[-\s]?\d{3}$/.test(value.trim());
  }

  function validateForm() {
    const nextErrors = {
      name: name.trim().length >= 2 ? '' : 'Please enter your full name.',
      email: isValidEmail(email.trim()) ? '' : 'Please enter a valid email address.',
      phone: validatePhone(phone) ? '' : 'Please enter a valid Ethiopian phone number after +251 that starts with 7 or 9.',
      address: address.trim().length >= 10 ? '' : 'Please enter a shipping address with at least 10 characters.',
    };

    setFieldErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.phone && !nextErrors.address;
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setName(value);
    setFieldErrors((current) => ({ ...current, name: value.trim().length >= 2 ? '' : 'Please enter your full name.' }));
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setEmail(value);
    setFieldErrors((current) => ({ ...current, email: isValidEmail(value.trim()) ? '' : 'Please enter a valid email address.' }));
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPhone(value);
    setFieldErrors((current) => ({ ...current, phone: validatePhone(value) ? '' : 'Please enter a valid phone number starting with +251.' }));
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setAddress(value);
    setFieldErrors((current) => ({ ...current, address: value.trim().length >= 10 ? '' : 'Please enter a shipping address with at least 10 characters.' }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setError('Please sign in to place an order.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          shippingAddress: address.trim(),
          phone: `${countryCode} ${phone.trim()}`,
          total,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to place your order.');
      }

      setSubmitted(true);
      clearCart();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] bg-brand-50 p-10 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-950">Order complete</h2>
        <p className="mt-4 text-slate-700">Thanks for your order, {name}! We will email your order confirmation to {email}.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-soft">
      <h2 className="text-xl font-semibold text-slate-950">Checkout</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">Complete your purchase and place your order securely.</p>
      <div className="mt-6 space-y-6">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">Order summary</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(total)}</p>
          <p className="mt-2 text-sm text-slate-500">{items.length} item(s) in cart</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="Full name"
              aria-invalid={Boolean(fieldErrors.name)}
              className={`w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.name ? 'border-red-400' : 'border-slate-200'}`}
            />
            {fieldErrors.name ? <p className="mt-2 text-sm text-red-600">{fieldErrors.name}</p> : null}
          </div>
          <div>
            <input
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="Email address"
              aria-invalid={Boolean(fieldErrors.email)}
              className={`w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.email ? 'border-red-400' : 'border-slate-200'}`}
            />
            {fieldErrors.email ? <p className="mt-2 text-sm text-red-600">{fieldErrors.email}</p> : null}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-600">
                {countryCode}
              </span>
              <input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="9xx xxx xxx"
                aria-invalid={Boolean(fieldErrors.phone)}
                className={`min-w-0 flex-1 rounded-3xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.phone ? 'border-red-400' : 'border-slate-200'}`}
              />
            </div>
            {fieldErrors.phone ? <p className="mt-2 text-sm text-red-600">{fieldErrors.phone}</p> : null}
          </div>
          <div>
            <textarea
              value={address}
              onChange={handleAddressChange}
              rows={4}
              placeholder="Shipping address"
              aria-invalid={Boolean(fieldErrors.address)}
              className={`w-full rounded-3xl border bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 ${fieldErrors.address ? 'border-red-400' : 'border-slate-200'}`}
            />
            {fieldErrors.address ? <p className="mt-2 text-sm text-red-600">{fieldErrors.address}</p> : null}
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Placing order…' : 'Place order'}
          </button>
        </form>
      </div>
    </div>
  );
}
