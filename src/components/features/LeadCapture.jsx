import { useState } from 'react'
import { getSupabase } from '../../lib/supabase'

/**
 * LeadCapture – Reusable lead capture form
 *
 * Stores submissions in a Supabase `leads` table.
 * Falls back gracefully when Supabase isn't configured.
 *
 * Required Supabase table schema:
 *   CREATE TABLE leads (
 *     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 *     name TEXT NOT NULL,
 *     email TEXT NOT NULL,
 *     phone TEXT,
 *     message TEXT,
 *     source TEXT DEFAULT 'website',
 *     created_at TIMESTAMPTZ DEFAULT NOW()
 *   );
 */

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function LeadCapture() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const supabase = getSupabase()

    if (!supabase) {
      // Fallback: log to console (or could POST to a webhook)
      console.log('Lead captured (no Supabase):', form)
      setStatus('success')
      setForm(initialForm)
      return
    }

    const { error } = await supabase.from('leads').insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || null,
        source: 'landing-page',
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section id="lead-capture" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Launch?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tell us about your business and we&apos;ll build your AI-powered website.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                How can we help? <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Tell us about your business..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending...' : 'Get Started'}
            </button>

            {status === 'success' && (
              <p className="text-center text-sm font-medium text-green-600">
                ✅ Thanks! We&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm font-medium text-red-600">
                ❌ Something went wrong: {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}