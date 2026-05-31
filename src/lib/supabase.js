/**
 * Halcyn Stack – Supabase Client
 *
 * Singleton Supabase client used across all components.
 * Import this file wherever you need database or auth access.
 *
 * Usage:
 *   import { supabase } from '../lib/supabase'
 *   const { data, error } = await supabase.from('leads').select('*')
 */

import { createClient } from '@supabase/supabase-js'
import config from './config'

let supabaseInstance = null

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance

  const { url, anonKey } = config.supabase
  if (!url || !anonKey) {
    console.warn(
      'Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
    )
    return null
  }

  supabaseInstance = createClient(url, anonKey)
  return supabaseInstance
}

/** Convenience export */
export const supabase = getSupabase()