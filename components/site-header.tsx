'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/cart-context';
import { useSessionToken } from '@/components/session-token-context';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAdmin } = useSessionToken();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Account', href: '/account' },
    ...(isAdmin ? [{ label: 'Admin', href: '/admin' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#8a9a7b]/20 bg-[#f5f0e8]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-['Playfair_Display'] text-lg font-semibold tracking-tight text-[#2c2c2c]">
          Soltexs Bonda
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center rounded-full border border-[#8a9a7b]/20 bg-white px-4 py-2 text-sm font-semibold text-[#2c2c2c] transition hover:border-[#8a9a7b]/30 md:hidden"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/cart" className="relative inline-flex items-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
            Cart
            {itemCount > 0 ? (
              <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-brand-700">
                {itemCount}
              </span>
            ) : null}
          </Link>
          <Link href="/shop" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
            Shop
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[#8a9a7b]/20 bg-white/95 px-4 py-5 md:hidden">
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-3xl border border-[#e8dfd2] bg-[#f8f3ea] px-4 py-3 text-sm font-medium text-[#2c2c2c] transition hover:bg-[#efe5d8]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="block rounded-3xl bg-[#8a9a7b] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#7a8a6b]"
              onClick={() => setOpen(false)}
            >
              Cart{itemCount > 0 ? ` (${itemCount})` : ''}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
