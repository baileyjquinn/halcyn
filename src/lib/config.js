/**
 * Halcyn Stack – Configuration
 *
 * Centralized config for Supabase, branding, and services.
 * Set environment variables in .env or your hosting dashboard.
 */

const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Halcyn',
    tagline: import.meta.env.VITE_APP_TAGLINE || 'Your AI-Powered Business Hub',
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'hello@halcyn.dev',
  },
}

export default config