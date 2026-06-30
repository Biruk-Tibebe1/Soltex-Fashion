const products = [
  {
    name: 'Vintage Linen Shirt',
    price: 'ETB 2,080',
    category: 'Tops',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Clean Denim Jacket',
    price: 'ETB 2,860',
    category: 'Outerwear',
    image:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Soft Knit Dress',
    price: 'ETB 2,420',
    category: 'Dresses',
    image:
      'https://images.unsplash.com/photo-1495121605193-b116b5b9c6c8?auto=format&fit=crop&w=900&q=80',
  },
];

export function FeaturedProducts() {
  return (
    <section id="products" className="mt-16 rounded-[2rem] bg-white/80 p-8 shadow-soft backdrop-blur-xl md:p-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Featured pieces
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Handpicked styles for your next look
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
        >
          Browse the full catalog
        </a>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
            <div className="space-y-2 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{product.category}</p>
              <h3 className="text-xl font-semibold text-slate-950">{product.name}</h3>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>{product.price}</span>
                <button className="rounded-full bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700">
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
