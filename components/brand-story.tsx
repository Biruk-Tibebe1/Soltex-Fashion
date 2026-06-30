export function BrandStory() {
  return (
    <section id="story" className="mt-16 rounded-[2rem] bg-brand-50/80 p-8 shadow-soft md:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Our story
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Built by a student, inspired by sustainable fashion.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-slate-700">
            Soltexs Bonda Fashion is the modern thrift destination for clean secondhand pieces. It was founded by a Dilla University student who turned a passion for style into an affordable, eco-friendly fashion experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">Affordable style</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Enjoy quality vintage-inspired clothing without the premium price.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">Sustainable wardrobe</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Choose pieces that are curated, clean, and kind to the planet.</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="rounded-3xl bg-slate-100 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Mission</p>
            <p className="mt-3 text-slate-700">Bring stylish thrift fashion to everyone with a fresh, affordable experience.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-brand-100 p-5">
              <p className="text-lg font-semibold text-slate-950">Curated</p>
              <p className="mt-2 text-sm text-slate-700">Only quality secondhand pieces make it into our shop.</p>
            </div>
            <div className="rounded-3xl bg-brand-100 p-5">
              <p className="text-lg font-semibold text-slate-950">Trusted</p>
              <p className="mt-2 text-sm text-slate-700">A thoughtful shopping experience for every customer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
