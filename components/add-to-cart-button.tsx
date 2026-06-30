'use client';

import { useCart } from '@/components/cart-context';
import type { Product } from '@/lib/products';

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
    >
      Add to cart
    </button>
  );
}
