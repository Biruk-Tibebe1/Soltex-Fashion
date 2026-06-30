'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { clearSupabaseSessionCookies, setSupabaseSessionCookies } from '@/lib/auth';

type SessionTokenContextValue = {
  token: string | null;
  user: any | null;
  isAdmin: boolean;
};

const SessionTokenContext = createContext<SessionTokenContextValue>({ token: null, user: null, isAdmin: false });

export function SessionTokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map((email) => email.trim().toLowerCase())
    : ['biruktibebesol@gmail.com', 'admin@soltexs.com'];

  const isAdmin = Boolean(user?.email && adminEmails.includes(user.email.toLowerCase()));

  useEffect(() => {
    const supabaseClient = supabase;
    if (!supabaseClient) return;

    let isMounted = true;

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      if (!isMounted) return;
      setToken(session?.access_token ?? null);
      setUser(session?.user ?? null);
      setSupabaseSessionCookies(session ?? null);
    };

    loadSession();

    const { data: subscription } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setToken(session?.access_token ?? null);
      setUser(session?.user ?? null);
      setSupabaseSessionCookies(session ?? null);
      if (!session) {
        clearSupabaseSessionCookies();
      }
    });

    return () => {
      isMounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  return <SessionTokenContext.Provider value={{ token, user, isAdmin }}>{children}</SessionTokenContext.Provider>;
}

export function useSessionToken() {
  return useContext(SessionTokenContext);
}
