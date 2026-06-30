const testimonials = [
  {
    quote: 'The curated thrift selection is beautiful and feels so premium. Shopping feels effortless.',
    author: 'Emma L.',
  },
  {
    quote: 'I found unique pieces for everyday style, and the brand story makes it feel personal.',
    author: 'Mariam T.',
  },
];

export function Testimonials() {
  return (
    <section className="mt-16 rounded-[2rem] bg-brand-50/80 p-8 shadow-soft md:p-12">
      <div className="grid gap-10 lg:grid-cols-2">
        {testimonials.map((item) => (
          <div key={item.author} className="rounded-[1.75rem] bg-white p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
            <p className="mt-6 font-semibold text-slate-950">{item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
