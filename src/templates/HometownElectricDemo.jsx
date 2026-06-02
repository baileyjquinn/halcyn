import { useState, useRef, useEffect } from 'react'
import { getSupabase } from '../lib/supabase'

/**
 * Hometown Electric NC — Halcyn Demo Landing Page
 *
 * A "first look" demo for an electrician with no website.
 * Key angle: "Missed calls while working = lost revenue"
 * Highlights 24/7 AI lead capture, missed-call recovery, ROI projections.
 *
 * Target: Owner-operator, Hometown Electric NC, Charlotte NC
 * Wedge: $497 setup + $49/mo — Projected ROI: 20-40x ($1,000–$2,000/mo)
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
    "Hi there! ⚡ Got an electrical issue? Tell me what's happening and I'll get an electrician to you ASAP.",
    "Great, thanks! What's your name so the electrician knows who to look for?",
    "Perfect! And a phone number so they can call before arriving?",
    "Got it! One last thing — what's the electrical issue?",
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
      email: 'demo@hometownelectricnc.com',
      phone,
      message: `Electrical issue: ${issue} | Source: AI Chatbot Demo - Hometown Electric`,
      source: 'chatbot-demo-hometown-electric',
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
      {open && (
        <div className="w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 rounded-t-2xl bg-amber-600 px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-lg font-bold">
              ⚡
            </div>
            <div>
              <p className="text-sm font-semibold">Halcyn AI Assistant</p>
              <p className="text-xs text-amber-200">Online • 24/7</p>
            </div>
          </div>

          <div className="h-72 space-y-3 overflow-y-auto p-4">
            {!submitted ? (
              <>
                <div className="flex">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">
                    {botMessages[step]}
                  </div>
                </div>

                <div className="mt-2">
                  {step === 0 && (
                    <button
                      onClick={() => handleUserResponse('yes')}
                      className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
                    >
                      ⚡ I have an electrical issue
                    </button>
                  )}
                  {step === 1 && (
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && name && handleUserResponse(name)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
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
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      autoFocus
                    />
                  )}
                  {step === 3 && (
                    <div className="space-y-2">
                      <select
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      >
                        <option value="">Select issue...</option>
                        <option value="Power outage - emergency">🚨 Power outage — Emergency!</option>
                        <option value="Faulty wiring">🔌 Faulty wiring</option>
                        <option value="Panel upgrade">⚡ Panel upgrade</option>
                        <option value="Outlet not working">🔋 Dead outlet</option>
                        <option value="Light fixture install">💡 Light fixture install</option>
                        <option value="Electrical inspection">📋 Electrical inspection</option>
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
                      className="mt-2 w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
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
                  An electrician will call you shortly at <strong>{phone}</strong>.
                </p>
                <button
                  onClick={resetChat}
                  className="mt-4 text-sm font-medium text-amber-600 hover:underline"
                >
                  Start new request
                </button>
              </div>
            )}
            {error && <p className="text-center text-sm text-red-600">❌ {error}</p>}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-2xl text-white shadow-lg transition hover:bg-amber-700 hover:shadow-xl"
      >
        {open ? '✕' : '⚡'}
      </button>
    </div>
  )
}

/* ──────── Hero Section ──────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-200">
            Hometown Electric NC • Charlotte, NC
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Never Miss a Call{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              While You Work
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-amber-100 sm:text-xl">
            Hometown Electric — you&apos;re the owner, the crew, and the dispatcher.
            Every call you miss on a job is a job going to a competitor. Let AI
            answer for you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#roi"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-amber-900 shadow-lg transition hover:bg-amber-50 hover:shadow-xl"
            >
              See Your ROI
            </a>
            <a
              href="#demo"
              className="rounded-xl border border-amber-400/40 bg-amber-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-amber-700/50"
            >
              Live Demo ↓
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
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
      icon: '🔌',
      title: 'No Website',
      desc: 'Hometown Electric has zero website presence. Customers can\'t find you, book you, or trust your legitimacy online.',
    },
    {
      icon: '📱',
      title: 'Missed Calls = Missed Revenue',
      desc: 'As a 1-van operator, every hour on a job is an hour you can\'t answer the phone. Each missed call is a $200 job lost.',
    },
    {
      icon: '⏰',
      title: 'No After-Hours Capture',
      desc: 'Electrical emergencies don\'t follow business hours. Without 24/7 capture, those calls go straight to voicemail — and competitors.',
    },
    {
      icon: '📋',
      title: 'Facebook Isn\'t Enough',
      desc: 'A Facebook page looks unprofessional and doesn\'t show up in Google searches for "electrician near me Charlotte."',
    },
  ]

  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Missed Calls Are Your Competitor&apos;s Next Job
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            While you&apos;re upgrading a panel or fixing a short, potential customers are
            calling. If you can&apos;t answer, they call the next electrician in Google.
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

/* ──────── ROI Section ──────── */

function ROISection() {
  return (
    <section id="roi" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">The Opportunity</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What&apos;s a 24/7 Digital Receptionist Worth?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            For a 1-van electrical business in Charlotte, every missed call is money
            on the table. Here&apos;s what capturing them means for you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Projected Monthly Uplift</p>
            <p className="mt-3 text-5xl font-extrabold text-amber-700">$1,000–$2,000</p>
            <p className="mt-2 text-sm text-amber-600">Additional revenue from captured missed calls</p>
            <div className="mt-4 rounded-lg bg-amber-100 px-4 py-2">
              <span className="text-lg font-bold text-amber-800">20–40x ROI</span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Investment</p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">$497</p>
            <p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">$49</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Average Job Value</p>
            <p className="mt-3 text-5xl font-extrabold text-amber-600">$200</p>
            <p className="mt-2 text-sm text-gray-500">per service call</p>
            <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2">
              <span className="text-sm font-medium text-amber-700">5–10 additional jobs/month</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">Missed calls per day while on jobs</span>
              <span className="font-semibold text-gray-900">~3–5 calls/day</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">After-hours calls (30% of total)</span>
              <span className="font-semibold text-gray-900">~6–12 calls/mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-600">Conversion rate with AI booking</span>
              <span className="font-semibold text-gray-900">~80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Revenue at $200/job</span>
              <span className="text-lg font-bold text-amber-700">$1,000–$2,000/mo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────── Solution Section ──────── */

function SolutionSection() {
  const features = [
    {
      icon: '🤖',
      title: '24/7 AI Chatbot',
      desc: 'Answers calls, qualifies leads, and books jobs automatically — even while you\'re up a ladder.',
    },
    {
      icon: '📅',
      title: 'Smart Scheduling',
      desc: 'Customers book online. Syncs to your calendar with automated SMS reminders (cuts no-shows by 40%).',
    },
    {
      icon: '🌐',
      title: 'Professional Website',
      desc: 'Mobile-first design built in days. SEO optimized for "electrician Charlotte NC" searches.',
    },
    {
      icon: '📋',
      title: 'Lead Dashboard',
      desc: 'See every lead, booking, and customer interaction in one place. Know exactly where your calls come from.',
    },
    {
      icon: '📱',
      title: 'Text & Email Follow-Up',
      desc: 'Automated follow-ups to prospects who didn\'t book immediately. Recover 30% of "almost" customers.',
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
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-600">The Halcyn Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything a Busy Electrician Needs
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A complete digital toolkit for Hometown Electric — built in days, not weeks.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-amber-100 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
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

/* ──────── Demo / Lead Capture ──────── */

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
      console.log('Hometown Electric lead:', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      return
    }

    const { error } = await supabase.from('leads').insert([{
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || 'Hometown Electric NC demo interest',
      source: 'hometown-electric-demo',
    }])

    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-amber-900 to-orange-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">Live Demo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Try the AI Chatbot — It Answers While You Work
            </h2>
            <p className="mt-4 text-lg text-amber-200">
              Click the ⚡ chat bubble in the bottom-right corner. This is what
              Hometown Electric&apos;s 24/7 lead capture looks like — no phone required.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-amber-700/50 bg-amber-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">1️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Click Chat</h3>
              <p className="mt-1 text-sm text-amber-200">Open the AI assistant</p>
            </div>
            <div className="rounded-xl border border-amber-700/50 bg-amber-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">2️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Describe Issue</h3>
              <p className="mt-1 text-sm text-amber-200">Tell us what&apos;s wrong</p>
            </div>
            <div className="rounded-xl border border-amber-700/50 bg-amber-800/30 p-6 text-center backdrop-blur-sm">
              <span className="text-3xl">3️⃣</span>
              <h3 className="mt-3 font-semibold text-white">Get Help</h3>
              <p className="mt-1 text-sm text-amber-200">An electrician calls back</p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-amber-700/30 bg-amber-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">Want This for Your Business?</h3>
            <p className="mt-2 text-center text-sm text-amber-200">
              We&apos;ll build your demo site in 48 hours.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="name" required value={form.name} onChange={handleChange}
                placeholder="Your Name"
                className="block w-full rounded-lg border border-amber-700/50 bg-amber-900/50 px-4 py-2.5 text-sm text-white placeholder-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-300" />
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="Email Address"
                className="block w-full rounded-lg border border-amber-700/50 bg-amber-900/50 px-4 py-2.5 text-sm text-white placeholder-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-300" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                placeholder="Phone Number"
                className="block w-full rounded-lg border border-amber-700/50 bg-amber-900/50 px-4 py-2.5 text-sm text-white placeholder-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-300" />
              <button type="submit" disabled={status === 'loading'}
                className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-amber-900 shadow-lg transition hover:bg-amber-50 disabled:opacity-60">
                {status === 'loading' ? 'Sending...' : '⚡ Get My Demo Site'}
              </button>
              {status === 'success' && (
                <p className="text-center text-sm font-medium text-green-400">✅ Thanks! We&apos;ll build your demo within 48 hours.</p>
              )}
              {status === 'error' && <p className="text-center text-sm font-medium text-red-400">❌ {errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────── Testimonial ──────── */

function TestimonialSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Social Proof</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by Charlotte Trades</h2>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">⚡</div>
          <blockquote className="mt-4 text-lg italic text-gray-700">
            &ldquo;I was losing calls every time I was on a job. Since Halcyn set up my site with AI booking, I haven&apos;t missed a single lead. First month I booked 8 extra jobs — $1,600 I would have lost.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-gray-900">— Charlotte-area electrical contractor</p>
          <p className="text-sm text-gray-500">Halcyn Client since 2025</p>
        </div>
      </div>
    </section>
  )
}

/* ──────── Pricing ──────── */

function PricingSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Simple Pricing</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">One Price. Everything Included.</h2>
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-amber-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Hometown Electric — First Client Offer</p>
          <p className="mt-4"><span className="text-5xl font-extrabold text-gray-900">$49</span><span className="text-gray-500">/mo</span></p>
          <p className="mt-1 text-sm text-gray-500">+ <strong>$497</strong> one-time setup</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ Professional website — mobile responsive</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot — books jobs automatically</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte electrical</li>
            <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
          </ul>
          <a href="#lead-capture" className="mt-8 inline-block w-full rounded-xl bg-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700">
            ⚡ Get Started
          </a>
        </div>
      </div>
    </section>
  )
}

/* ──────── CTA ──────── */

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-amber-600 to-orange-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Never Miss Another Call</h2>
        <p className="mt-4 text-lg text-amber-100">
          Hometown Electric — you do quality work. Let&apos;s make sure every
          Charlotte homeowner who needs an electrician can find you and book you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#lead-capture" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-amber-700 shadow-lg transition hover:bg-amber-50">
            ⚡ Get My Demo Site
          </a>
          <a href="#roi" className="inline-block rounded-xl border border-amber-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700/30">
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
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Halcyn. Built for Hometown Electric NC — Charlotte, NC.</p>
          <p className="text-sm text-gray-500">
            Demo landing page.{' '}
            <a href="https://github.com/baileyjquinn/halcyn" className="text-amber-600 hover:underline">View on GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ──────── Main App ──────── */

export default function HometownElectricDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-sm font-bold text-white">H</span>
            Halcyn
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-amber-600">ROI</a>
            <a href="#demo" className="hover:text-amber-600">Features</a>
            <a href="#lead-capture" className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700">Get Demo</a>
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
      <ChatBubble />
    </div>
  )
}