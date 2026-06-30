# Soltex-Fashion

Soltex-Fashion is a modern Next.js e-commerce storefront built for a curated thrift fashion brand. It combines a polished shopping experience with user authentication, Supabase-backed data storage, client-side cart persistence, and AI-powered styling assistance.

## Built with

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Supabase (authentication, database, storage)
- GROQ AI integration for optional stylist/chat features

## Key Features

- Home page with featured products and brand content
- Shop page with product browsing and filtering
- Product details page with image, size options, and add-to-cart action
- Client-side shopping cart stored in `localStorage`
- Email authentication with Supabase sign-in, sign-up, and magic links
- User profile and avatar upload support via secure server-side API routes
- Order creation and order history using Supabase backend
- Admin navigation available to approved admin email addresses
- AI-powered chat assistant and stylist recommendation widgets
- Server-side product loading using Supabase service role key

## Screenshots

![Soltex-Fashion home page example](https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80)

![Shop and product browsing example](https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80)

![Stylist AI assistant example](https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80)

> These image links are included as visual examples. Replace them with real app screenshots once the storefront is deployed or when you capture the UI directly.

## App Pages

- `Home` — landing page for the brand, with hero content, featured product sections, and marketing messaging.
- `Shop` — catalog browsing, product filtering, and collection discovery with a clean card layout.
- `Product details` — detailed product view with images, description, size options, styling notes, and add-to-cart flow.
- `Cart` — review selected items, update quantities, remove products, and place orders via checkout.
- `Account` — sign in, sign up, profile management, avatar upload, and order history for authenticated users.
- `Admin` — restricted dashboard for approved admin emails, with direct access to product, order, and settings management pages.
- `About` — brand story and mission page describing the purpose and values behind the storefront.

## Project Structure

- `app/` – Next.js page routes, layouts, API routes, and route handlers
- `components/` – Reusable UI components, auth forms, cart context, session context, and AI widgets
- `lib/` – Supabase client/server helpers, authentication cookie helpers, OpenAI/GROQ helpers, and AI fallback logic
- `public/` – Static assets (if present)
- `supabase-schema.sql` – Database schema for core app tables
- `supabase-schema-products.sql` – Product schema for the shop catalog

## Environment Variables

The app uses Supabase and optional AI services. Create a `.env.local` file at the project root and provide these values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GROQ_API_KEY=your-groq-api-key
NEXT_PUBLIC_ADMIN_EMAILS=biruktibebesol@gmail.com,admin@soltexs.com
```

### Notes

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required for client-side Supabase operations.
- `SUPABASE_SERVICE_ROLE_KEY` is required for server-side Supabase reads and writes in secure API routes.
- `GROQ_API_KEY` is optional. If it is not provided, the AI chat and stylist assistant fall back to built-in responses.
- `NEXT_PUBLIC_ADMIN_EMAILS` controls which users see the admin navigation links.

## Local Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the app.

## Production Build

Build and preview production output locally:

```bash
npm run build
npm run start
```

## Authentication Flow

- Client-side auth uses `@supabase/supabase-js`
- `components/supabase-auth.tsx` handles sign-in, sign-up, password input, and magic links
- `components/session-token-context.tsx` stores session cookies and exposes current user state
- `lib/auth.ts` helps set and clear Supabase session cookies and resolve the user from requests

## Data and API Flow

- `lib/supabase-client.ts` creates a client-side Supabase instance
- `lib/supabase-server.ts` creates a server-side Supabase client using `SUPABASE_SERVICE_ROLE_KEY`
- Product pages load data from Supabase server-side for secure queries
- `app/api/orders/route.ts` handles order creation and retrieval for authenticated users
- `app/api/profile/route.ts` and `app/api/profile/avatar/route.ts` manage user profile data and avatar uploads

## AI Features

- `components/ai-chat-widget.tsx` provides a small customer support chat bubble
- `components/ai-stylist.tsx` provides a stylist recommendation form
- `app/api/ai/chat/route.ts` and `app/api/ai/stylist/route.ts` route AI requests through a GROQ endpoint if configured
- `lib/ai-fallback.ts` provides fallback responses when the AI API key is missing or unavailable

## Cart Persistence

- `components/cart-context.tsx` manages cart state in React context
- Cart items are persisted to `localStorage` under `bonda-cart`
- Cart totals and quantities are calculated from persisted items

## Admin and Access Control

- `components/session-token-context.tsx` determines whether a signed-in user is an admin using `NEXT_PUBLIC_ADMIN_EMAILS`
- `components/site-header.tsx` shows an admin link only for approved admin users

## Database Schema

The repository includes SQL files to model the database schema. Use these files when creating or migrating your Supabase database:

- `supabase-schema.sql`
- `supabase-schema-products.sql`

## Useful Scripts

- `npm run dev` – start development server
- `npm run build` – compile production build
- `npm run start` – run the production server
- `npm run lint` – run Next.js lint checks

## Deployment

This project is ready for deployment to Vercel, Netlify, or any platform that supports Next.js:

1. Set the same environment variables in your hosting provider.
2. Deploy the app.
3. Ensure the Supabase project is configured with the tables required by the SQL schema files.

## Contributing

If you want to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with a clear description of the change.

## License

No license has been specified in this repository.

