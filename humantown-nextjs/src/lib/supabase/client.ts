/**
 * Supabase Client Configuration
 *
 * This file initializes the Supabase client for browser/client-side use.
 * Uses the anon key which is safe to expose in the browser.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

/**
 * Supabase client for client-side operations
 *
 * Uses Row Level Security (RLS) policies defined in the database.
 * Safe to use in browser/client components.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're not using Supabase Auth for now
  },
});

/**
 * Example usage:
 *
 * import { supabase } from '@/lib/supabase/client';
 *
 * const { data, error } = await supabase
 *   .from('reservations')
 *   .select('*')
 *   .eq('guest_email', 'user@example.com');
 */
