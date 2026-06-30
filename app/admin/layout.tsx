'use client';

import Link from 'next/link';
import { useSessionToken } from '@/components/session-token-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useSessionToken();

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#f8faf4] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Admin access required</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Restricted dashboard</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              You do not have permission to view admin pages. Please sign in with an admin account to continue.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/account" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Go to account
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
