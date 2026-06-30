'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

export function ProductFilter({ products, onFilter }: { products: Product[]; onFilter: (items: Product[]) => void }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((product) => product.category)))],
    [products],
  );

  useEffect(() => {
    let filtered = products;
    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    onFilter(filtered);
    setMessage(filtered.length === 0 ? 'No products match your current filters.' : '');
  }, [category, onFilter, products, search]);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-semibold text-slate-900">Filter by category</label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-semibold text-slate-900">Search products</label>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or style"
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
        />
        {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
      </div>
    </div>
  );
}
