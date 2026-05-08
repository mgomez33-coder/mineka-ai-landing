import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function isSupabaseAdminConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always write refreshed cookies.
          }
        },
      },
    }
  );
}

export async function getUser() {
  const supabase = await createClient();
  if (!supabase) {
    return { user: null, supabase: null };
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return { user: null, supabase };
  }

  return { user: data.user, supabase };
}

export async function createAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }

  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
