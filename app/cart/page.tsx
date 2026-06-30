'use client';

import { useCart } from '@/components/cart-context';
import { CheckoutForm } from '@/components/checkout-form';

export default function CartPage() {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();

  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Cart</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Your selected items</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Review your cart, update quantities, and proceed to checkout with confidence.</p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
            <p className="text-lg font-semibold text-slate-950">Your cart is currently empty.</p>
            <p className="mt-3 text-sm leading-7">Add curated thrift pieces from the shop to start building your order.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.slug} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.category}</p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-950">{item.name}</h2>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    </div>
                    <div className="space-y-3 text-right">
                      <p className="text-lg font-semibold text-slate-950">{item.price}</p>
                      <div className="flex items-center justify-end gap-3">
                        <label className="text-sm text-slate-600">Qty</label>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) => updateQuantity(item.slug, Number(event.target.value))}
                          className="w-20 rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                        />
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-sm font-semibold text-brand-700 transition hover:text-brand-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-brand-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Order summary</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(total)}</p>
                <p className="mt-2 text-sm text-slate-600">{itemCount} item(s) ready to checkout</p>
              </div>
              <CheckoutForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
