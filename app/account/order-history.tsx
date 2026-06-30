'use client';

import { useEffect, useState } from 'react';
import { useSessionToken } from '@/components/session-token-context';

type Order = {
  id: string;
  items: Array<{ name: string; price: string; quantity: number }>;
  total: number;
  shipping_address: string;
  phone: string;
  status: string;
  created_at: string;
};

export function OrderHistory() {
  const { token } = useSessionToken();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Unable to load orders.');
        }
        setOrders(data.orders || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  if (!token) return <p className="text-sm text-slate-600">Sign in to view your orders.</p>;
  if (loading) return <p className="text-sm text-slate-600">Loading your orders…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          <p className="font-semibold text-slate-950">No orders yet</p>
          <p className="mt-2 text-sm leading-7">Your past orders will appear here after purchase.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Order {order.id.slice(0, 8)}</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">{order.status}</p>
              </div>
              <p className="text-sm text-slate-600">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">Shipping address</p>
                <p className="mt-2 text-sm text-slate-600">{order.shipping_address}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">Phone</p>
                <p className="mt-2 text-sm text-slate-600">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Total</p>
                <p className="mt-2 text-sm text-slate-600">{new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(order.total)}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p>{item.quantity} × {item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
