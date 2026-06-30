import { NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import { getTokenFromRequest } from '@/lib/auth';

async function authorize(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return { error: NextResponse.json({ error: 'Authentication required.' }, { status: 401 }) };
  }

  const supabaseServer = requireSupabaseServer();
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) {
    return { error: NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 }) };
  }

  const email = userData.user.email?.toLowerCase();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((value) => value.trim().toLowerCase())
    : ['biruktibebesol@gmail.com', 'admin@soltexs.com'];

  if (!email || !adminEmails.includes(email)) {
    return { error: NextResponse.json({ error: 'Admin access required.' }, { status: 403 }) };
  }

  return { supabaseServer };
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const supabaseServer = auth.supabaseServer;

  const body = await request.json();
  const { name, slug, category, price, description, image, sizes, details } = body;

  if (!name || !slug || !category || !price || !description || !image || !Array.isArray(sizes) || sizes.length === 0 || !details) {
    return NextResponse.json({ error: 'Missing product fields.' }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from('products')
    .update({ name, slug, category, price, description, image, sizes, details })
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Unable to update product.' }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;
  const auth = await authorize(request);
  if ('error' in auth) return auth.error;
  const supabaseServer = auth.supabaseServer;

  const { data, error } = await supabaseServer.from('products').delete().eq('id', params.id).single();

  if (error) {
    return NextResponse.json({ error: 'Unable to delete product.' }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}
