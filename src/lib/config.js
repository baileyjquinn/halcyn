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
  payments: {
    setupLink: import.meta.env.VITE_STRIPE_SETUP_URL || 'https://buy.stripe.com/00w9AV2ONcXG6tp8K8dEs00',
    retainerLink: import.meta.env.VITE_STRIPE_RETAINER_URL || 'https://buy.stripe.com/28EdRbahf1eY4lh0dCdEs01',
  },
}

export default config