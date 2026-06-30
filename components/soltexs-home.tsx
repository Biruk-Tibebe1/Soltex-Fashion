'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { useCart } from '@/components/cart-context';

const products: Product[] = [
  {
    slug: 'vintage-denim-jacket',
    name: 'Vintage Denim Jacket',
    category: 'women',
    price: 'ETB 2,800',
    description: 'A refined thrift staple layered with timeless character.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L'],
    details: 'Softly worn denim with a crisp structure and relaxed silhouette.',
  },
  {
    slug: 'summer-floral-dress',
    name: 'Summer Floral Dress',
    category: 'women',
    price: 'ETB 3,200',
    description: 'Fresh florals for a polished everyday wardrobe.',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L'],
    details: 'Lightweight and airy, perfect for easy movement and effortless style.',
  },
  {
    slug: 'casual-check-shirt',
    name: 'Casual Check Shirt',
    category: 'men',
    price: 'ETB 1,800',
    description: 'Relaxed, carefully curated, and easy to style.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    sizes: ['M', 'L', 'XL'],
    details: 'Classic check fabric with a comfortable relaxed fit.',
  },
  {
    slug: 'leather-briefcase',
    name: 'Leather Briefcase',
    category: 'accessories',
    price: 'ETB 4,500',
    description: 'Premium texture and refined lines for a smart finish.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    sizes: ['One Size'],
    details: 'Crafted with vintage-inspired detailing and polished leather.',
  },
  {
    slug: 'urban-sneakers',
    name: 'Urban Sneakers',
    category: 'accessories',
    price: 'ETB 3,600',
    description: 'Modern sneakers built for everyday movement.',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
    sizes: ['39', '40', '41'],
    details: 'Clean profile with lightweight cushioning and retro charm.',
  },
  {
    slug: 'classic-blazer',
    name: 'Classic Blazer',
    category: 'men',
    price: 'ETB 5,200',
    description: 'Sharp lines and a timeless profile for polished looks.',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    sizes: ['M', 'L', 'XL'],
    details: 'A tailored finish that pairs well with everything from trousers to denim.',
  },
  {
    slug: 'silk-scarf',
    name: 'Silk Scarf',
    category: 'accessories',
    price: 'ETB 1,200',
    description: 'A light statement layer that elevates any outfit.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    sizes: ['One Size'],
    details: 'Soft silk texture with a muted palette and elegant drape.',
  },
  {
    slug: 'retro-sunglasses',
    name: 'Retro Sunglasses',
    category: 'accessories',
    price: 'ETB 950',
    description: 'A subtle vintage accent for confident styling.',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    sizes: ['One Size'],
    details: 'An easy accessory that adds personality to any look.',
  },
];

const categories = ['all', 'women', 'men', 'accessories'] as const;

type Category = (typeof categories)[number];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 4h2l2 10h10l2-7H7" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3V8a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m5 12 14-7-4 7 4 7-14-7Z" />
    </svg>
  );
}

export function SoltexsHome() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<string[]>([
    'Hi! 👋 How can I help you today?',
  ]);
  const { addItem, items, itemCount, total, updateQuantity, removeItem } = useCart();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message) return;

    setMessages((current) => [...current, message]);
    setChatInput('');

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        'Thanks for your message! Our team will get back to you shortly. 💚',
      ]);
    }, 800);
  };

  return (
    <>
      <main className="min-h-screen bg-[#f5f0e8] text-[#2c2c2c]">
        <section className="relative h-[74vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"
            alt="Fashion editorial hero"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-6 py-20 sm:px-8 md:px-16 lg:px-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#c4a265]">
              Curated thrift fashion • sustainable style
            </p>
            <h2 className="mb-4 font-['Playfair_Display'] text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Soltexs Bonda Fashion
            </h2>
            <p className="mb-8 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              Discover clean secondhand clothing for a stylish, affordable, and sustainable lifestyle crafted by a passionate student-led brand.
            </p>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-fit rounded-full bg-[#8a9a7b] px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Shop the collection
            </button>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8a9a7b]">Featured pieces</p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold text-[#2c2c2c] sm:text-4xl">
                Fresh thrift finds for every mood
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category
                      ? 'bg-[#8a9a7b] text-white'
                      : 'bg-white text-[#2c2c2c] hover:bg-[#f1e8db]'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.slug}
                className="group overflow-hidden rounded-[1.25rem] border border-[#e8dfd2] bg-white shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#2c2c2c]">{product.name}</p>
                  <p className="mt-1 text-sm text-[#7d7a73]">{product.price}</p>
                  <button
                    onClick={() => addItem(product)}
                    className="mt-4 w-full rounded-lg bg-[#8a9a7b] py-2 text-sm font-semibold text-white transition hover:bg-[#7a8a6b]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#8a9a7b]/10 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="About Soltexs Bonda"
              className="h-80 w-full rounded-[1.5rem] object-cover"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8a9a7b]">Our story</p>
              <h2 className="mt-3 font-['Playfair_Display'] text-3xl font-semibold text-[#2c2c2c] sm:text-4xl">
                Built by a student, inspired by sustainable fashion.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4f4a41]">
                Soltexs Bonda Fashion is a modern thrift destination for clean secondhand pieces. Founded by a young visionary from Dilla University, the brand blends affordability, style, and sustainability into one thoughtful experience.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex rounded-full border border-[#8a9a7b]/30 bg-white px-6 py-3 text-sm font-semibold text-[#2c2c2c] transition hover:bg-[#f2e4d2]"
              >
                Discover the brand
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#8a9a7b]/20 bg-[#f7efe6] py-8 text-center text-sm text-[#6b675f]">
        <p>© 2026 Soltexs Bonda Fashion. Crafted for clean thrift style.</p>
      </footer>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition ${isCartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e8dfd2] p-6">
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#2c2c2c]">Your cart</h3>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-center text-sm text-[#7d7a73]">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="rounded-[1rem] bg-[#f8f3ea] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#2c2c2c]">{item.name}</p>
                      <p className="mt-1 text-xs text-[#7d7a73]">{item.price}</p>
                    </div>
                    <button onClick={() => removeItem(item.slug)} className="text-sm text-[#8a9a7b]">
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#2c2c2c]">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-[#e8dfd2] p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold text-[#2c2c2c]">Total</span>
            <span className="text-lg font-bold text-[#2c2c2c]">{total}</span>
          </div>
          <button className="w-full rounded-full bg-[#8a9a7b] py-3 text-sm font-semibold text-white transition hover:bg-[#7a8a6b]">
            Checkout
          </button>
        </div>
      </aside>

      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed right-6 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#8a9a7b]/20 bg-white text-[#2c2c2c] shadow-lg"
        aria-label="Open cart"
      >
        <CartIcon />
        {itemCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#c4a265] px-1 text-[11px] font-bold text-white">
            {itemCount}
          </span>
        ) : null}
      </button>

      <button
        onClick={() => setIsChatOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#8a9a7b] text-white shadow-lg transition hover:scale-110"
        aria-label="Open chat"
      >
        <MessageIcon />
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-2xl transition-all ${
          isChatOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between bg-[#8a9a7b] p-4 text-white">
          <span className="font-semibold">Style Assistant</span>
          <button onClick={() => setIsChatOpen(false)} aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={`${message}-${index}`}
              className={`max-w-[80%] rounded-[0.9rem] p-3 text-sm ${
                index % 2 === 0
                  ? 'bg-[#f5f0e8] text-[#2c2c2c]'
                  : 'ml-auto bg-[#8a9a7b] text-white'
              }`}
            >
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-[#e8dfd2] p-3">
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-[#e8dfd2] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8a9a7b]/30"
          />
          <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8a9a7b] text-white">
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
}
