import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#8a9a7b]/20 bg-[#f7efe6] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8a9a7b]">Soltexs Bonda Fashion</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              A modern thrift shopping experience for people who want clean, affordable, and sustainable clothing.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">Explore</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="/shop" className="transition hover:text-[#8a9a7b]">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="transition hover:text-[#8a9a7b]">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Support</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="/cart" className="transition hover:text-[#8a9a7b]">
                    Cart
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#8a9a7b]">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-sm text-slate-500">© 2026 Soltexs Bonda Fashion. Crafted for clean thrift style.</p>
      </div>
    </footer>
  );
}
