import { useState, useEffect } from 'react'
import { getSupabase } from './lib/supabase'
import SouthEndPlumbingDemo from './templates/SouthEndPlumbingDemo.jsx'
import HometownElectricDemo from './templates/HometownElectricDemo.jsx'
import SteadfastPlumbingDemo from './templates/SteadfastPlumbingDemo.jsx'
import DrainRightPlumbingDemo from './templates/DrainRightPlumbingDemo.jsx'
import ElectricExpressDemo from './templates/ElectricExpressDemo.jsx'
import LandscapingDemo from './templates/LandscapingDemo.jsx'
import AdminDashboard from './templates/AdminDashboard.jsx'

const demos = {
  'south-end':  { component: SouthEndPlumbingDemo,  name: 'South End Plumbing',       theme: 'blue',   icon: '💧' },
  'hometown':   { component: HometownElectricDemo,   name: 'Hometown Electric NC',     theme: 'amber',  icon: '⚡' },
  'steadfast':  { component: SteadfastPlumbingDemo,  name: 'Steadfast Mechanical & Services',    theme: 'red',    icon: '🔒' },
  'drain-right':{ component: DrainRightPlumbingDemo, name: 'Drain Right Plumbing',     theme: 'teal',   icon: '💧' },
  'electric-express':{component: ElectricExpressDemo,name: 'Electric Express CLT',     theme: 'purple', icon: '⚡' },
  'landscaping':    { component: LandscapingDemo,     name: 'Artificial Turf Products', theme: 'green',  icon: '🌿' },
  'admin':          { component: AdminDashboard,      name: 'Lead Dashboard',           theme: 'cyan',  icon: '📊' },
}

function LeadCaptureForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const supabase = getSupabase()
    if (!supabase) {
      console.log('Halcyn sales lead:', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      return
    }
    const { error } = await supabase.from('leads').insert([{
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: `Halcyn sales inquiry: ${form.message || 'Interested in AI website'}`,
      source: 'halcyn-sales-page',
      business_id: 'biz-halcyn',
    }])
    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name"
        className="block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30" />
      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address"
        className="block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30" />
      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number (optional)"
        className="block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30" />
      <textarea name="message" rows={2} value={form.message} onChange={handleChange} placeholder="What's your business? (optional)"
        className="block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30" />
      <button type="submit" disabled={status === 'loading'}
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700 disabled:opacity-60">
        {status === 'loading' ? 'Sending...' : '🚀 Get My AI Website Today'}
      </button>
      {status === 'success' && <p className="text-center text-sm font-medium text-green-400">✅ Thanks! We'll reach out within 24 hours.</p>}
      {status === 'error' && <p className="text-center text-sm font-medium text-red-400">❌ {errorMsg}</p>}
    </form>
  )
}

function LandingPage() {
  const [visible, setVisible] = useState([])
  const [testimonialsVisible, setTestimonialsVisible] = useState(false)
  useEffect(() => {
    const entries = Object.entries(demos).filter(([k]) => k !== 'admin')
    entries.forEach(([key], i) => {
      setTimeout(() => setVisible(v => [...v, key]), i * 100)
    })
    setTimeout(() => setTestimonialsVisible(true), 800)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">H</span>
            <span className="text-lg font-bold text-white">Halcyn</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 sm:flex">
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#testimonials" className="transition hover:text-white">Testimonials</a>
            <a href="#templates" className="transition hover:text-white">Demos</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#get-started" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700">Get Started</a>
          </nav>
          <a href="#get-started" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700 sm:hidden">Get Started</a>
        </div>
      </header>

      {/* Hero Section — Headline 2 (ROI/Revenue Angle) */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Trusted by Charlotte Home Service Pros
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Add <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">$3,000–$4,500/Month</span> in After-Hours Revenue
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl">
            Charlotte plumbers and HVAC companies are using Halcyn's AI booking system to capture leads 24/7. No contracts. No hidden fees.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            We build professional websites with built-in AI chatbots that capture, qualify, and book service calls — even when you're off the clock. Trusted by Charlotte plumbers, HVAC contractors, electricians, and landscapers.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#get-started" className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl">
              🚀 Start Capturing Leads — $497
            </a>
            <a href="#templates" className="rounded-xl border border-gray-600 bg-gray-800/50 px-8 py-3.5 text-sm font-semibold text-gray-300 backdrop-blur-sm transition hover:border-gray-500 hover:text-white">
              See Your Demo →
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">⚡ $497 one-time setup • $49/month • Cancel anytime</p>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="border-y border-gray-800 bg-gray-900/50 py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Serving Charlotte's Home Service Community</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span>🔧 Plumbers</span>
              <span>❄️ HVAC Contractors</span>
              <span>⚡ Electricians</span>
              <span>🌿 Landscapers</span>
              <span>🏠 Roofers</span>
              <span>🌳 Tree Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Your AI Website in 48 Hours</h2>
            <p className="mt-4 text-lg text-gray-400">No agency fees. No 6-month contracts. Just results.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-4">
            {[
              { step: '1️⃣', title: 'We Build', desc: 'A custom site for your business with your branding — mobile-first and lightning fast.' },
              { step: '2️⃣', title: 'We Train', desc: 'The AI chatbot learns your services, pricing, and service area inside and out.' },
              { step: '3️⃣', title: 'We Launch', desc: 'Your site goes live with 24/7 lead capture ready to book jobs instantly.' },
              { step: '4️⃣', title: 'You Earn', desc: 'After-hours leads flow directly to your calendar. Revenue grows while you sleep.' },
            ].map((item, i) => (
              <div key={item.title} className={`rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-500 ${
                visible.includes(i.toString()) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } hover:border-cyan-500/30`}>
                <span className="text-3xl">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section — What You Get */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">What You Get</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything You Need to Grow</h2>
            <p className="mt-4 text-lg text-gray-400">A complete digital presence that works for you around the clock.</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🤖', title: 'AI Chatbot', desc: 'Answers calls and books jobs 24/7 — even holidays. Never miss another after-hours lead.' },
              { icon: '📅', title: 'Online Booking', desc: 'Customers schedule appointments directly from your website. Syncs to your calendar automatically.' },
              { icon: '📱', title: 'Mobile-First Design', desc: 'Looks professional on every device. 60% of searches happen on phones — your site will shine.' },
              { icon: '🔒', title: 'SSL Security', desc: 'No "Not Secure" warnings scaring customers away. Chrome-verified HTTPS on every page.' },
              { icon: '📋', title: 'Lead Dashboard', desc: 'See every captured lead in real time. Know exactly where your calls come from.' },
              { icon: '💰', title: '$497 / $49 Plan', desc: 'All inclusive. No hidden fees. Professional site + AI booking + ongoing support.' },
            ].map((f, i) => (
              <div key={f.title} className={`group rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-500 ${
                visible.includes(`feat-${i}`) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5`}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">{f.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`px-4 py-20 transition-all duration-700 sm:px-6 sm:py-28 ${
        testimonialsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Trusted by Charlotte Pros</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Real Feedback From Local Businesses</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="text-xs text-gray-500">Winn's Plumbing</span>
              </div>
              <blockquote className="mt-3 text-sm italic leading-relaxed text-gray-300">
                &ldquo;I was skeptical about AI booking, but the Halcyn demo showed me exactly how it works. Their system would have caught three emergency calls I missed last Saturday alone.&rdquo;
              </blockquote>
              <p className="mt-3 text-xs font-medium text-gray-500">— Adam W., Owner, Winn's Plumbing (Charlotte, NC)</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="text-xs text-gray-500">Powerhouse Mechanical</span>
              </div>
              <blockquote className="mt-3 text-sm italic leading-relaxed text-gray-300">
                &ldquo;As an HVAC company, our busiest time is also when we're least available to answer phones. Halcyn's chatbot handles after-hours calls the same way my dispatcher would — and it books appointments directly to my calendar.&rdquo;
              </blockquote>
              <p className="mt-3 text-xs font-medium text-gray-500">— J. Andrews, Powerhouse Mechanical (Charlotte, NC)</p>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="text-xs text-gray-500">Thompson Plumbing</span>
              </div>
              <blockquote className="mt-3 text-sm italic leading-relaxed text-gray-300">
                &ldquo;I was paying $2,000+ to an agency for a basic website that didn't even capture leads. Halcyn gave me a better site, an AI booking system, and ongoing support — all for $49 a month. That's a no-brainer.&rdquo;
              </blockquote>
              <p className="mt-3 text-xs font-medium text-gray-500">— Thompson Plumbing & Pump Service (Mooresville, NC)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section — Live Demos */}
      <section id="templates" className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">See It In Action</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Live Demo Templates</h2>
            <p className="mt-4 text-lg text-gray-400">Click any template to see a fully functional AI-powered landing page built for that business type.</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(demos).filter(([k]) => k !== 'admin').map(([key, demo]) => {
              const t = themeClasses[demo.theme]
              const isVisible = visible.includes(key)
              return (
                <a key={key} href={`?demo=${key}`}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-500 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  } hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20`}>
                  <div className={`absolute inset-x-0 top-0 h-1 ${t.bg} opacity-60`} />
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${t.bg} text-lg`}>{demo.icon}</span>
                      <h3 className="mt-4 text-lg font-semibold text-white">{demo.name}</h3>
                    </div>
                    <span className={`rounded-full ${t.bg}/10 px-2.5 py-0.5 text-xs font-medium ${t.text}`}>{demo.theme}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">View live demo →</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Simple Pricing</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Start Growing Your Business Today</h2>
            <p className="mt-4 text-lg text-gray-400">Professional AI-powered website. One price. Everything included.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {/* Standard Plan */}
            <div className="relative rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Standard</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">$49</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">+ <span className="font-semibold text-gray-300">$497</span> one-time setup</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">✅ AI Chatbot — books jobs 24/7</li>
                <li className="flex items-start gap-2">✅ Online booking with calendar sync</li>
                <li className="flex items-start gap-2">✅ Mobile-first professional website</li>
                <li className="flex items-start gap-2">✅ SSL Security — no warnings</li>
                <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
                <li className="flex items-start gap-2">✅ SEO optimized for local search</li>
                <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
              </ul>
              <a href="#get-started" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700">
                🚀 Start Capturing Leads — $497
              </a>
            </div>

            {/* Custom Plan */}
            <div className="relative rounded-2xl border border-cyan-500/30 bg-gray-800/50 p-8 backdrop-blur-sm transition hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <span className="absolute -top-3 right-4 rounded-full bg-cyan-500 px-3 py-0.5 text-xs font-semibold text-white">Popular</span>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Custom Integrations</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">$97</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">+ <span className="font-semibold text-gray-300">$997</span> one-time setup</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">✅ Everything in Standard, plus:</li>
                <li className="flex items-start gap-2">✅ Custom automation workflows</li>
                <li className="flex items-start gap-2">✅ Multi-van dispatch management</li>
                <li className="flex items-start gap-2">✅ Advanced reporting & analytics</li>
                <li className="flex items-start gap-2">✅ Priority support & training</li>
                <li className="flex items-start gap-2">✅ Custom integrations (QuickBooks, etc.)</li>
                <li className="flex items-start gap-2">✅ Dedicated onboarding specialist</li>
              </ul>
              <a href="#get-started" className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700">
                🚀 Get Custom Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture / CTA Section */}
      <section id="get-started" className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Get Started Today</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Start Capturing After-Hours Leads?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Fill out the form below and we'll build your professional website with AI lead capture in one week.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-xl">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm">
                <LeadCaptureForm />
              </div>
              <div className="mt-6 grid gap-4 text-center text-xs text-gray-500 sm:grid-cols-3">
                <div><span className="font-medium text-gray-400">⚡ Built in 48 hours</span></div>
                <div><span className="font-medium text-gray-400">🔒 Cancel anytime</span></div>
                <div><span className="font-medium text-gray-400">📞 Free consultation</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <section className="border-t border-gray-800 bg-gray-900/50 px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm italic text-gray-500">&ldquo;We don't build websites. We build revenue streams.&rdquo;</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-600">
            <span>🔧 Plumbers</span>
            <span>❄️ HVAC</span>
            <span>⚡ Electricians</span>
            <span>🌿 Landscapers</span>
            <span>🏠 Roofers</span>
            <span>🌳 Tree Service</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white">H</span>
              <span className="text-sm font-bold text-gray-400">Halcyn</span>
            </div>
            <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Halcyn. AI-powered websites for Charlotte home service pros.</p>
            <p className="text-xs text-gray-600">
              <a href="https://github.com/baileyjquinn/halcyn" className="transition hover:text-cyan-400">View on GitHub</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const themeClasses = {
  blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600' },
  amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600' },
  red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600' },
  teal: { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600' },
  purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600' },
  green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600' },
  cyan: { bg: 'bg-cyan-600', hover: 'hover:bg-cyan-700', text: 'text-cyan-600' },
}

export default function App() {
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  )
  const demo = params.get('demo')

  if (demo && demos[demo]) {
    const DemoComponent = demos[demo].component
    return <DemoComponent />
  }

  return <LandingPage />
}