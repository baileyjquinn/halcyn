# Halcyn Stack

The **Halcyn Stack** is a reusable framework for deploying AI-powered small business websites. Built with Vite, React, Tailwind CSS, and Supabase.

## Quick Start

```bash
npm install
cp .env.example .env   # Add Supabase credentials
npm run dev            # Dev server on http://localhost:5173
npm run build          # Production build → dist/
```

## Modular Architecture

```
src/
  lib/                 # Supabase client, config
  components/
    layout/            # Header, Footer
    features/          # Hero, FeaturesSection, LeadCapture, CTASection
  templates/           # Reusable niche templates (Home Services, etc.)
  pages/               # Route-based pages
```

## Key Components

- **LeadCapture** — Collects leads and stores them in Supabase `leads` table
- **FeaturesSection** — Configurable feature grid
- **Hero** — Gradient hero with CTA buttons
- **Header/Footer** — Responsive layouts

## Environment Variables

See `.env.example` for all required variables.

## Supabase Setup

Create a `leads` table:

```sql
CREATE TABLE leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

Powered by **Halcyn** — AI-powered business websites.