import './globals.css';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { AiChatWidget } from '@/components/ai-chat-widget';
import { CartProvider } from '@/components/cart-context';
import { SessionTokenProvider } from '@/components/session-token-context';

export const metadata: Metadata = {
  title: 'Soltexs Bonda Fashion',
  description: 'Clean, curated thrift fashion for everyone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f5f0e8] text-[#2c2c2c] antialiased">
        <SessionTokenProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <AiChatWidget />
          </CartProvider>
        </SessionTokenProvider>
      </body>
    </html>
  );
}
