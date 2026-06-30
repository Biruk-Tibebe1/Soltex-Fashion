import { NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import { getTokenFromRequest } from '@/lib/auth';

export const runtime = 'edge';

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

  const formData = await request.formData();
  const file = formData.get('avatar');
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Avatar file is required.' }, { status: 400 });
  }

  const fileName = `avatars/${userData.user.id}-${Date.now()}.png`;
  const bucket = 'avatars';

  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: '3600', upsert: false, contentType: file.type });

  if (error) {
    return NextResponse.json({ error: 'Avatar upload failed.' }, { status: 500 });
  }

  const { data: publicUrlData } = supabaseServer.storage.from(bucket).getPublicUrl(fileName);
  const avatarUrl = publicUrlData.publicUrl;

  const { error: updateError } = await supabaseServer
    .from('profiles')
    .upsert([
      {
        id: userData.user.id,
        email: userData.user.email,
        avatar_url: avatarUrl,
      },
    ]);

  if (updateError) {
    return NextResponse.json({ error: 'Unable to save avatar URL.' }, { status: 500 });
  }

  return NextResponse.json({ avatarUrl });
}
