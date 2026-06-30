import { requireSupabaseServer } from '@/lib/supabase-server';
import type { Session } from '@supabase/supabase-js';

export const ACCESS_TOKEN_COOKIE = 'sb-access-token';
export const REFRESH_TOKEN_COOKIE = 'sb-refresh-token';

function buildCookieValue(name: string, value: string, maxAgeSeconds: number) {
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  return `${name}=${encodeURIComponent(value)}; path=/; sameSite=lax; max-age=${maxAgeSeconds};${secure ? ' secure;' : ''}`;
}

export function setSupabaseSessionCookies(session: Session | null) {
  if (typeof window === 'undefined') return;

  if (!session) {
    clearSupabaseSessionCookies();
    return;
  }

  const expiresAt = session.expires_at ? Math.max(session.expires_at - Math.floor(Date.now() / 1000), 0) : 60 * 60;
  const refreshMaxAge = 60 * 60 * 24 * 30; // 30 days

  document.cookie = buildCookieValue(ACCESS_TOKEN_COOKIE, session.access_token, expiresAt);
  document.cookie = buildCookieValue(REFRESH_TOKEN_COOKIE, session.refresh_token, refreshMaxAge);
}

export function clearSupabaseSessionCookies() {
  if (typeof window === 'undefined') return;

  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0;`;
  document.cookie = `${REFRESH_TOKEN_COOKIE}=; path=/; max-age=0;`;
}

export function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }

  return request.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getUserFromRequest(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const supabaseServer = requireSupabaseServer();
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token);
  if (userError || !userData.user) {
    return null;
  }

  return userData.user;
}
