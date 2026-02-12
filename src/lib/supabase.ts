import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY;

let _client: SupabaseClient<Database> | null = null;

/**
 * Supabase client for server and client (lazy init).
 * Uses NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_PUBLISHABLE_KEY.
 * Throws only when first used if env vars are missing.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!_client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_PUBLISHABLE_KEY)"
      );
    }
    _client = createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}
