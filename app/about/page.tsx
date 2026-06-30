import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f4eb] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10 lg:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8a9a7b]">About Soltexs</p>
          <h1 className="mt-4 font-['Playfair_Display'] text-4xl font-semibold text-[#2c2c2c] sm:text-5xl">
            Built for affordable, modern thrift style.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_0.95fr] lg:items-center">
            <div className="space-y-4 text-base leading-8 text-[#4f4a41]">
              <p>
                Soltexs Bonda Fashion was founded by a passionate young student with a love for fashion and business. The brand exists to make clean, curated thrift pieces feel accessible, elegant, and easy to wear.
              </p>
              <p>
                Every item is selected with a focus on quality, sustainability, and timeless style so customers can build wardrobes that feel personal, polished, and responsible.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f0e8] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c4a265]">Mission</p>
              <p className="mt-4 text-lg leading-8 text-[#2c2c2c]">
                To make stylish, sustainable fashion affordable for everyone while keeping the experience fresh, trustworthy, and joyful.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-[#8a9a7b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7a8a6b]">
              Browse the shop
            </Link>
            <Link href="/" className="rounded-full border border-[#d9cfbf] bg-white px-6 py-3 text-sm font-semibold text-[#2c2c2c] transition hover:bg-[#f4ece0]">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
