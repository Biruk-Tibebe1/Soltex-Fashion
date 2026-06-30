const categories = [
  { name: 'Tops', description: 'Crisp shirts, cozy knits, and everyday essentials.' },
  { name: 'Outerwear', description: 'Layered jackets and polished thrift coats.' },
  { name: 'Dresses', description: 'Effortless secondhand dresses for any occasion.' },
];

export function ProductCategories() {
  return (
    <section className="mt-16 rounded-[2rem] bg-white/80 p-8 shadow-soft backdrop-blur-xl md:p-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Shop by category</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Find your next statement piece</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
          Explore fresh thrift categories built for style, sustainability, and everyday confidence.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-slate-950">{category.name}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
