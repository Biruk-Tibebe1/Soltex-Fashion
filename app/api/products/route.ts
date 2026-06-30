import { NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const supabaseServer = requireSupabaseServer();

  const { data, error } = await supabaseServer.from('products').select('id,slug,name,category,price,description,image,sizes,details').order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Unable to load products.' }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}
