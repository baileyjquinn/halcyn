import { useState, useRef, useEffect } from 'react'
import { getSupabase } from '../lib/supabase'

/**
 * South End Plumbing — Halcyn Demo Landing Page
 *
 * A "first look" demo for a plumbing business with no website.
 * Highlights 24/7 AI lead capture, ROI projections, and plumber-specific features.
 *
 * Target: Mike (owner), South End Plumbing, Charlotte NC
 * Wedge: $497 setup + $49/mo — Projected ROI: 40-76x ($2,000–$3,750/mo)
 */

/* ──────── Chat Bubble — AI Lead Capture Chatbot Simulation ──────── */

function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [issue, setIssue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const botMessages = [
    "Hi there! 👋 Got a plumbing emergency? Tell me what's going on and I'll get help to you ASAP.",
    "Great, thanks! What's your name so I can let the team know who to look out for?",
    "Perfect! And a phone number so the plumber can call you before they arrive?",
    "Got it! One last thing — what's the plumbing issue?",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [step, submitted])

  function handleUserResponse(value) {
    if (step === 1) setName(value)
    else if (step === 2) setPhone(value)
    else if (step === 3) setIssue(value)
    if (step < 3) setStep(s => s + 1)
  }

  async function handleSubmit() {
    setSending(true)
    setError('')

    const supabase = getSupabase()
    const lead = {
      name,
      email: 'demo@southendplumbing.com',
      phone,
      message: `Plumbing issue: ${issue} | Source: AI Chatbot Demo`,
      source: 'chatbot-demo-south-end',
    }

    if (!supabase) {
      console.log('Lead captured (demo):', lead)
      setSubmitted(true)
      setSending(false)
      return
    }

    const { error: err } = await supabase.from('leads').insert([lead])
    if (err) {
      setError(err.message)
    } else {
      setSubmitted(true)
    }
    setSending(false)
  }

  function resetChat() {
    setStep(0)
    setSubmitted(false)
    setName('')
    setPhone('')
    setIssue('')
    setError('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {open && (
        <div className="w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-blue-600 px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold">
              🤖
            </div>
            <div>
              <p className="text-sm font-semibold">Halcyn AI Assistant</p>
              <p className="text-xs text-blue-200">Online • 24/7</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 space-y-3 overflow-y-auto p-4">
            {!submitted ? (
              <>
                {/* Bot message */}
                <div className="flex">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">
                    {botMessages[step]}
                  </div>
                </div>

                {/* User input */}
                <div className="mt-2">
                  {step === 0 && (
                    <button
                      onClick={() => handleUserResponse('yes')}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      💧 I have a plumbing issue
                    </button>
                  )}
                  {step === 1 && (
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && name && handleUserResponse(name)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      autoFocus
                    />
                  )}
                  {step === 2 && (
                    <input
                      type="tel"
                      placeholder="(704) 555-..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && phone && handleUserResponse(phone)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      autoFocus
                    />
                  )}
                  {step === 3 && (
                    <div className="space-y-2">
                      <select
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Select issue...</option>
                        <option value="Burst pipe - emergency">🚨 Burst pipe — Emergency!</option>
                        <option value="Water heater broken">🔥 Water heater broken</option>
                        <option value="Clogged drain">🚿 Clogged drain</option>
                        <option value="Leaky faucet">💧 Leaky faucet</option>
                        <option value="Sewer backup">⚠️ Sewer backup</option>
                        <option value="Toilet not flushing">🚽 Toilet not flushing</option>
                        <option value="Other">Other</option>
                      </select>
                      {issue && (
                        <button
                          onClick={handleSubmit}
                          disabled={sending}
                          className="w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                        >
                          {sending ? 'Sending...' : '✅ Get Help Now'}
                        </button>
                      )}
                    </div>
                  )}
                  {step > 0 && step < 3 && (
                    <button
                      onClick={() => handleUserResponse('')}
                      className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Continue →
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 text-4xl">✅</div>
                <p className="font-semibold text-gray-900">Help is on the way!</p>
                <p className="mt-1 text-sm text-gray-600">
                  A plumber will call you shortly at <strong>{phone}</strong>.
                </p>
                <button
                  onClick={resetChat}
                  className="mt-4 text-sm font-medium text-blue-600 hover:underline"
                >
                  Start new request
                </button>
              </div>
            )}
            {error && (
              <p className="text-center text-sm text-red-600">❌ {error}</p>
            )}
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}

/* ──────── Hero Section ──────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200">
            South End Plumbing • Charlotte, NC
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your 24/7{' '}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              AI Plumber
            </span>{' '}
            is Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
            South End Plumbing — you&apos;re the best-kept secret in Charlotte.
            Let&apos;s fix that. A professional website with AI booking captures
            jobs while you work.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#roi"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50 hover:shadow-xl"
            >
              See Your ROI
            </a>
            <a
              href="#demo"
              className="rounded-xl border border-blue-400/40 bg-blue-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-blue-700/50"
            >
              Live Demo ↓
            </a>
          </div>
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      {/* Plumbing pattern overlay */}
      <div className="absolute inset-0 -z-20 opacity-[0.03]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>
    </section>
  )
}

/* ──────── The Problem Section ──────── */

function ProblemSection() {
  const problems = [
    {
      icon: '📱',
      title: 'Zero Website',
      desc: 'South End Plumbing has no website at all. 76% of consumers search online before calling a plumber.',
    },
    {
      icon: '🌙',
      title: 'Missed After-Hours Calls',
      desc: '30% of plumbing searches happen after 5PM or on weekends. Without 24/7 capture, those leads call competitors.',
    },
    {
      icon: '📞',
      title: 'Phone-Only Booking',
      desc: 'When you\'re on a job, you can\'t answer. Voicemail after hours means lost revenue — $250 per missed job.',
    },
    {
      icon: '🔍',
      title: 'Google Invisible',
      desc: 'Competitors with websites appear above you in search. Charlotte Plumbing Pros is capturing your share.',
    },
  ]

  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Charlotte Can&apos;t Find You Online
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A water heater bursts at 9 PM in South End. Homeowner searches
            &quot;plumber near me&quot; — without a website, they find your competitor instead.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-100 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                {p.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────── ROI Calculator Section ──────── */

function ROISection() {
  return (
    <section id="roi" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            The Opportunity
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What&apos;s a Digital Presence Worth?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            For a 2-van plumbing business in South End Charlotte, the numbers speak for themselves.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* ROI Card */}
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Projected Monthly Uplift
            </p>
            <p className="mt-3 text-5xl font-extrabold text-green-700">
              $2,000–$3,750
            </p>
            <p className="mt-2 text-sm text-green-600">
              Additional revenue from digital presence
            </p>
            <div className="mt-4 rounded-lg bg-green-100 px-4 py-2">
              <span className="text-lg font-bold text-green-800">40–76x ROI</span>
            </div>
          </div>

          {/* Cost Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Your Investment
            </p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">
              $497
            </p>
            <p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              $49
            </p>
            <p className="text-sm text-gray-500">per month</p>
          </div>

          {/* Avg Job Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Average Job Value
            </p>
            <p className="mt-3 text-5xl font-extrabold text-blue-600">$250</p>
            <p className="mt-2 text-sm text-gray-500">per service call</p>
            <div className="mt-4 rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-sm font-medium text-blue-700">
                8–15 additional jobs/month
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">After-hours calls captured (30% of total)</span>
              <span className="font-semibold text-gray-900">~10–18 calls/mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">Conversion rate to booked jobs</span>
              <span className="font-semibold text-gray-900">~80%</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">New jobs per month</span>
              <span className="font-semibold text-gray-900">8–15 jobs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Revenue at $250/job</span>
              <span className="text-lg font-bold text-green-700">$2,000–$3,750/mo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────── Features / Solution ──────── */

function SolutionSection() {
  const features = [
    {
      icon: '🤖',
      title: '24/7 AI Chatbot',
      desc: 'Answers calls, qualifies leads, and books appointments automatically — even while you\'re on a job.',
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      desc: 'Customers book online. Syncs to your calendar with automated SMS reminders (cuts no-shows by 40%).',
    },
    {
      icon: '🌐',
      title: 'Professional Website',
      desc: 'Mobile-first design that looks great. Built in days, not weeks. SEO optimized for Charlotte plumbing searches.',
    },
    {
      icon: '📋',
      title: 'Lead Dashboard',
      desc: 'See every lead, booking, and customer interaction in one place. Know exactly where your calls come from.',
    },
    {
      icon: '📱',
      title: 'Text & Email Follow-Up',
      desc: 'Automated follow-ups to prospects who didn\'t book immediately. Recover 30% of &quot;almost&quot; customers.',
    },
    {
      icon: '⭐',
      title: 'Review Management',
      desc: 'Automated review requests after every job. Build your Google reputation while you work.',
    },
  ]

  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            The Halcyn Solution
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A complete digital toolkit for South End Plumbing — no technical skills required.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-blue-100 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                {f.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────── Live Demo / Lead Capture ──────── */

function DemoSections() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
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
      console.log('South End Plumbing lead:', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      return
    }

    const { error } = await supabase.from('leads').insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || 'South End Plumbing demo interest',
        source: 'south-end-plumbing-demo',
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    setStatus('success')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Live Demo
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See It in Action — Try the AI Chatbot
            </h2>
            <p className="mt-4 text-lg text-blue-200">
              Click the 💬 chat bubble in the bottom-right corner. Experience how
              South End Plumbing can capture leads 24/7 — no phone required.
            </p>
          </div>

          {/* Demo Steps */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-700/50 bg-blue-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">1️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Click Chat</h3>
              <p className="mt-1 text-sm text-blue-200">Open the AI assistant</p>
            </div>
            <div className="rounded-xl border border-blue-700/50 bg-blue-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">2️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Describe Issue</h3>
              <p className="mt-1 text-sm text-blue-200">Tell us what&apos;s wrong</p>
            </div>
            <div className="rounded-xl border border-blue-700/50 bg-blue-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">3️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Get Help</h3>
              <p className="mt-1 text-sm text-blue-200">A plumber calls back</p>
            </div>
          </div>

          {/* Form */}
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-blue-700/30 bg-blue-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">
              Want This for Your Business?
            </h3>
            <p className="mt-2 text-center text-sm text-blue-200">
              Tell Mike we sent you. We&apos;ll build your demo site in 48 hours.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="block w-full rounded-lg border border-blue-700/50 bg-blue-900/50 px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="block w-full rounded-lg border border-blue-700/50 bg-blue-900/50 px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
              />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="block w-full rounded-lg border border-blue-700/50 bg-blue-900/50 px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : '🚀 Get My Demo Site'}
              </button>
              {status === 'success' && (
                <p className="text-center text-sm font-medium text-green-400">
                  ✅ Thanks, Mike! We&apos;ll build your demo and reach out within 48 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm font-medium text-red-400">
                  ❌ {errorMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────── Testimonial / Social Proof ──────── */

function TestimonialSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Social Proof
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trusted by Charlotte Trades
        </h2>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
            💬
          </div>
          <blockquote className="mt-4 text-lg italic text-gray-700">
            &ldquo;We were losing after-hours calls to voicemail. Halcyn set up
            a site with AI booking in 3 days. First month, we booked 12 extra
            jobs — $3,000 in revenue we would have missed.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-gray-900">
            — Charlotte-area plumbing business
          </p>
          <p className="text-sm text-gray-500">Halcyn Client since 2025</p>
        </div>
      </div>
    </section>
  )
}

/* ──────── Pricing Section ──────── */

function PricingSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Simple Pricing
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          One Price. Everything Included.
        </h2>
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            South End Plumbing — First Client Offer
          </p>
          <p className="mt-4">
            <span className="text-5xl font-extrabold text-gray-900">$49</span>
            <span className="text-gray-500">/mo</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            + <strong>$497</strong> one-time setup
          </p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ Professional website — mobile responsive</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot — books jobs automatically</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte plumbing</li>
            <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
          </ul>
          <a
            href="#lead-capture"
            className="mt-8 inline-block w-full rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            🚀 Get Started
          </a>
        </div>
      </div>
    </section>
  )
}

/* ──────── CTA Section ──────── */

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Mike, Let&apos;s Build Your Future Today
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          South End Plumbing is Charlotte&apos;s best-kept secret. Let&apos;s make
          sure every homeowner in South End knows it.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#lead-capture"
            className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            🚀 Get My Demo Site
          </a>
          <a
            href="#roi"
            className="inline-block rounded-xl border border-blue-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700/30"
          >
            See the Math
          </a>
        </div>
      </div>
    </section>
  )
}

/* ──────── Footer ──────── */

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Halcyn. Built for South End Plumbing — Charlotte, NC.
          </p>
          <p className="text-sm text-gray-500">
            Demo landing page.{' '}
            <a href="https://github.com/baileyjquinn/halcyn" className="text-blue-600 hover:underline">
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ──────── Main App ──────── */

export default function SouthEndPlumbingDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              H
            </span>
            Halcyn
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-blue-600">ROI</a>
            <a href="#demo" className="hover:text-blue-600">Features</a>
            <a
              href="#lead-capture"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Get Demo
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ROISection />
        <SolutionSection />
        <TestimonialSection />
        <DemoSections />
        <PricingSection />
        <CTASection />
      </main>

      <Footer />
      {/* AI Chatbot floating bubble */}
      <ChatBubble />
    </div>
  )
}