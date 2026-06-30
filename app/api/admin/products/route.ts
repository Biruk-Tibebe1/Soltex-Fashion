import { NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import { getTokenFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const supabaseServer = requireSupabaseServer();
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 });
  }

  const email = userData.user.email?.toLowerCase();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((value) => value.trim().toLowerCase())
    : ['admin@soltexs.com'];

  if (!email || !adminEmails.includes(email)) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const { data, error } = await supabaseServer.from('products').select('id,slug,name,category,price,description,image,sizes,details').order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Unable to load products.' }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const supabaseServer = requireSupabaseServer();
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 });
  }

  const email = userData.user.email?.toLowerCase();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((value) => value.trim().toLowerCase())
    : ['admin@soltexs.com'];

  if (!email || !adminEmails.includes(email)) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const body = await request.json();
  const { name, slug, category, price, description, image, sizes, details } = body;

  if (!name || !slug || !category || !price || !description || !image || !Array.isArray(sizes) || sizes.length === 0 || !details) {
    return NextResponse.json({ error: 'Missing product fields.' }, { status: 400 });
  }

  const { data, error } = await supabaseServer.from('products').insert([
    { name, slug, category, price, description, image, sizes, details },
  ]);

  if (error) {
    return NextResponse.json({ error: 'Unable to add product.' }, { status: 500 });
  }

  return NextResponse.json({ product: data?.[0] });
}
