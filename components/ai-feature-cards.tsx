const features = [
  {
    title: 'AI Personal Stylist',
    description: 'Tell the AI your preferences, and get full outfit recommendations from the catalog.',
  },
  {
    title: 'Generative Visual Tools',
    description: 'Create polished marketing visuals and style previews from your product collection.',
  },
  {
    title: 'Visual Search',
    description: 'Upload a photo or describe a look to find matching thrift pieces instantly.',
  },
  {
    title: 'Smart Product Picks',
    description: 'Personalized recommendations based on your style and recent store activity.',
  },
];

export function AiFeatureCards() {
  return (
    <section className="mt-16 rounded-[2rem] bg-white/80 p-8 shadow-soft backdrop-blur-xl md:p-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">AI powered style</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Intelligent shopping that feels personal
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-right">
          Explore AI features built for styling advice, product discovery, and visual inspiration.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-slate-950">{feature.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
