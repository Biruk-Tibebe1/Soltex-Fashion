'use client';

import Link from 'next/link';
import { useSessionToken } from '@/components/session-token-context';

export default function AdminPage() {
  const { user, isAdmin } = useSessionToken();

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#f8faf4] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Admin access required</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Restricted dashboard</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              You do not have permission to view this page. Sign in with an admin account to continue.
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

  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Owner Dashboard</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Admin Control Center</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Welcome back, {user?.email}. From here you can manage the full project.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <Link href="/admin/products" className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Products</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Manage product catalog</h2>
            <p className="mt-3 text-sm text-slate-600">Add, edit, and remove items in the shop.</p>
          </Link>
          <Link href="/admin/orders" className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Orders</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">View all orders</h2>
            <p className="mt-3 text-sm text-slate-600">Track purchases, customer details, and order status.</p>
          </Link>
          <Link href="/admin/settings" className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Settings</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Site configuration</h2>
            <p className="mt-3 text-sm text-slate-600">Update store settings, display text, and admin options.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
