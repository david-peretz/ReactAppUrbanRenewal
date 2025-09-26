import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Using a stub client for development.');

  const noop = async (..._args: any[]) => ({ data: null, error: new Error('Supabase not configured') });

  supabase = {
    from: (_table: string) => ({
      select: () => noop(),
      insert: () => noop(),
      update: () => noop(),
      delete: () => noop(),
      upsert: () => noop()
    }),
    auth: {
      signIn: () => noop(),
      signOut: () => noop(),
      user: () => null
    },
    rpc: () => noop(),
    any: () => noop()
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };