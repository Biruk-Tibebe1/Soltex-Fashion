'use client';

import { SupabaseAuth } from '@/components/supabase-auth';
import { ProfileForm } from '@/components/profile-form';
import { OrderHistory } from './order-history';

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Account</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Manage your account</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Register or log in to manage your profile, view order history, and keep your favorite looks saved.
          </p>
          <div className="mt-12 grid gap-10 xl:grid-cols-[0.95fr_0.95fr]">
            <div className="space-y-10">
              <SupabaseAuth />
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                <h2 className="text-xl font-semibold text-slate-950">Profile</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">Keep your name and avatar details up to date.</p>
                <div className="mt-6">
                  <ProfileForm />
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-xl font-semibold text-slate-950">Order history</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">See your previous purchases and order details.</p>
              <div className="mt-6">
                <OrderHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
