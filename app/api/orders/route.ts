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

  const { data, error } = await supabaseServer
    .from('orders')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Unable to load orders.' }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
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

  const body = await request.json();
  const { items, shippingAddress, phone, total } = body;

  if (!Array.isArray(items) || !shippingAddress || !phone || !total) {
    return NextResponse.json({ error: 'Order payload is invalid.' }, { status: 400 });
  }

  const { data, error } = await supabaseServer.from('orders').insert([
    {
      user_id: userData.user.id,
      items,
      shipping_address: shippingAddress,
      phone,
      total,
      status: 'completed',
    },
  ]);

  if (error) {
    return NextResponse.json({ error: 'Unable to save the order.' }, { status: 500 });
  }

  return NextResponse.json({ order: data?.[0] });
}
