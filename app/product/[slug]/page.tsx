import Link from 'next/link';
import { requireSupabaseServer } from '@/lib/supabase-server';
import { Product } from '@/lib/products';
import { AddToCartButton } from '@/components/add-to-cart-button';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabaseServer = requireSupabaseServer();

  const { data: product, error } = await supabaseServer
    .from('products')
    .select('id,slug,name,category,price,description,image,sizes,details')
    .eq('slug', params.slug)
    .single();

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#f8faf4] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-semibold text-slate-950">Product not found</h1>
          <p className="mt-4 text-slate-600">Please return to the shop and choose a different item.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const productData = product as Product;

  return (
    <main className="min-h-screen bg-[#f8faf4] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cover bg-center" style={{ backgroundImage: `url(${productData.image})` }} />
            <div className="mt-8 space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-700">{productData.category}</p>
              <h1 className="text-4xl font-semibold text-slate-950">{productData.name}</h1>
              <p className="text-lg leading-8 text-slate-700">{productData.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>Price: {productData.price}</span>
                <span>Sizes: {productData.sizes.join(', ')}</span>
              </div>
              <div className="rounded-3xl bg-brand-50 p-6 text-sm leading-7 text-slate-700">
                {productData.details}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-950">Choose your style</h2>
              <div className="mt-5 space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Select size</label>
                  <select className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400">
                    {productData.sizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <AddToCartButton product={productData} />
              </div>
            </div>
            <div className="rounded-[2rem] bg-brand-50 p-8 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-950">Style notes</h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                This piece is perfect for layering, mixing with classic neutrals, and building a sustainable wardrobe with lasting style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
