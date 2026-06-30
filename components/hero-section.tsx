export function HeroSection() {
  return (
    <section className="rounded-[2rem] bg-white/80 p-8 shadow-soft backdrop-blur-xl md:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Curated thrift fashion · sustainable style
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Soltexs Bonda Fashion
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            Discover clean secondhand clothing for a stylish, affordable, and sustainable lifestyle. Shop curated outfits with a modern, fresh fashion experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Shop curated styles
            </a>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
            >
              Learn our story
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-50 p-2 shadow-xl">
          <div className="aspect-[4/5] rounded-[1.75rem] bg-[radial-gradient(circle_at_top,_rgba(114,170,86,0.15),_transparent_45%),linear-gradient(180deg,_#ffffff_0%,_#eaf5e8_100%)] p-6">
            <div className="h-full w-full overflow-hidden rounded-[1.5rem] bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
