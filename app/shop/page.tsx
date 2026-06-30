'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { ProductFilter } from '@/components/product-filter';
import { AiStylist } from '@/components/ai-stylist';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load products.');
        }

        setProducts(data.products ?? []);
        setFilteredProducts(data.products ?? []);
      } catch (err: any) {
        setError(err?.message ?? 'Unable to load products.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);

  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] bg-white p-10 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Catalog</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Shop clean thrift styles</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Browse our curated selection of secondhand pieces, from tops and outerwear to dresses and statement bottoms.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
            <p className="text-sm text-slate-600">Loading products…</p>
          </div>
        ) : error ? (
          <div className="rounded-[2rem] bg-red-50 p-10 text-center shadow-soft">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
            <ProductFilter products={products} onFilter={setFilteredProducts} categories={categories} />
            <div className="space-y-10">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
              <AiStylist />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
