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

  const { data, error } = await supabaseServer.from('profiles').select('*').eq('id', userData.user.id).single();
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: 'Unable to load profile.' }, { status: 500 });
  }

  return NextResponse.json({ profile: data ?? { id: userData.user.id, email: userData.user.email } });
}

export async function PUT(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const supabaseServer = requireSupabaseServer();
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 });
  }

  const { fullName, avatarUrl } = await request.json();
  if (!fullName) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
  }

  const { data, error } = await supabaseServer.from('profiles').upsert([
    {
      id: userData.user.id,
      email: userData.user.email,
      full_name: fullName,
      avatar_url: avatarUrl,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: 'Unable to update profile.' }, { status: 500 });
  }

  return NextResponse.json({ profile: data?.[0] });
}
