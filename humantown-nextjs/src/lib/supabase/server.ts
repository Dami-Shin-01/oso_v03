/**
 * Supabase Server Client Configuration
 *
 * This file initializes the Supabase client for server-side use.
 * Uses the service role key which has elevated permissions.
 *
 * ⚠️ WARNING: Never expose this client to the browser!
 * Only use in API routes and server components.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase service role environment variables. Please check your .env.local file.'
  );
}

/**
 * Supabase client with service role privileges
 *
 * Bypasses Row Level Security (RLS) policies.
 * Use with caution - only in server-side code.
 *
 * ⚠️ NEVER use this client in client components or expose it to the browser!
 */
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Example usage (API Routes only):
 *
 * import { supabaseAdmin } from '@/lib/supabase/server';
 *
 * // In app/api/reservations/route.ts
 * export async function POST(request: Request) {
 *   const { data, error } = await supabaseAdmin
 *     .from('reservations')
 *     .insert({ ... });
 *
 *   return Response.json({ data, error });
 * }
 */
