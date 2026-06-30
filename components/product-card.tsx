'use client';

import Link from 'next/link';
import type { Product } from '@/lib/products';
import { AddToCartButton } from '@/components/add-to-cart-button';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{product.category}</p>
        <h3 className="mt-3 text-lg font-semibold text-slate-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-slate-950">{product.price}</span>
          <div className="flex flex-wrap gap-2">
            <Link href={`/product/${product.slug}`} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
              View
            </Link>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
