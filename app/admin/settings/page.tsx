'use client';

import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Settings</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Admin Settings</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Manage site-specific values and admin preferences from this area.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Back to admin home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
