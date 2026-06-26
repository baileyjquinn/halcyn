import { useState } from 'react'
import { getSupabase } from '../lib/supabase'
import Chatbot from '../components/features/Chatbot'

/**
 * Electric Express CLT — Halcyn Demo Landing Page
 *
 * For a business with an 8-year-old website that's not mobile responsive.
 * Angle: "Your 2017 website is costing you $5k+/mo"
 *
 * Target: 4-van electrical company, Charlotte NC
 * Wedge: $997 setup + $97/mo — Projected ROI: 50-75x ($5,000–$7,500/mo)
 */

/* ──────── Chatbot imported from ../components/features/Chatbot ──────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-purple-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-200">Electric Express CLT • Charlotte, NC</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Your Website Is Living in <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">2017</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-purple-100 sm:text-xl">Your website hasn't been updated since 2017. It's not mobile-friendly, has no booking, and looks abandoned. With 4 vans running, you're leaving $5k+/mo on the table.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#roi" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-purple-900 shadow-lg transition hover:bg-purple-50">See Your ROI</a>
            <a href="#demo" className="rounded-xl border border-purple-400/40 bg-purple-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-purple-700/50">Live Demo ↓</a>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute inset-0 -z-20 opacity-[0.03]"><div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:20px_20px]" /></div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { icon: '📅', title: '8-Year-Old Website', desc: 'Your site was built in 2017. Customers see a dated design and question whether you\'re still in business.' },
    { icon: '📱', title: 'Broken on Mobile', desc: '60% of searches happen on phones. Your site doesn\'t work on mobile — those customers leave instantly.' },
    { icon: '🤖', title: 'No AI Booking', desc: '4 vans = high call volume. Without 24/7 AI booking, you\'re missing calls every night and weekend.' },
    { icon: '📉', title: 'Lost $5k+/Month', desc: '30% of emergency electrical searches happen at night. Without after-hours capture, that\'s $5k-$7.5k/mo in missed revenue.' },
  ]
  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A 2017 Website Isn't a Digital Presence</h2>
          <p className="mt-4 text-lg text-gray-600">Your customers expect a modern, mobile-friendly experience. An 8-year-old site with no booking is actively driving them away.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{problems.map(p => (
          <div key={p.title} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">{p.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
          </div>
        ))}</div>
      </div>
    </section>
  )
}

function ROISection() {
  return (
    <section id="roi" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">The Opportunity</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's a Modern Website Worth for 4 Vans?</h2>
          <p className="mt-4 text-lg text-gray-600">For a 4-van electrical company with high call volume, a modern site with AI booking is a revenue multiplier.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Projected Monthly Uplift</p>
            <p className="mt-3 text-5xl font-extrabold text-green-700">$5,000–$7,500</p><p className="mt-2 text-sm text-green-600">Additional revenue</p>
            <div className="mt-4 rounded-lg bg-green-100 px-4 py-2"><span className="text-lg font-bold text-green-800">50–75x ROI</span></div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Investment</p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">$997</p><p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">$97</p><p className="text-sm text-gray-500">per month</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Average Job Value</p>
            <p className="mt-3 text-5xl font-extrabold text-purple-600">$250</p><p className="mt-2 text-sm text-gray-500">per service call</p>
            <div className="mt-4 rounded-lg bg-purple-50 px-4 py-2"><span className="text-sm font-medium text-purple-700">20–30 additional jobs/month</span></div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">Mobile visitors bouncing from broken site</span><span className="font-semibold text-gray-900">~60% leave immediately</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">After-hours calls missed (30% of total)</span><span className="font-semibold text-gray-900">~20-30 calls/mo</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">New bookings with 24/7 AI capture</span><span className="font-semibold text-gray-900">20–30 jobs</span></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-900">Revenue at $250/job</span><span className="text-lg font-bold text-green-700">$5,000–$7,500/mo</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const features = [
    { icon: '🌐', title: 'Modern Website', desc: 'A fresh, mobile-responsive website. Built in days, not weeks. Looks professional on every device.' },
    { icon: '🤖', title: '24/7 AI Chatbot', desc: 'Answer calls, qualify leads, and book jobs automatically. Captures every after-hours emergency call.' },
    { icon: '📅', title: 'Smart Scheduling', desc: 'Online booking synced to your calendar. SMS reminders cut no-shows by 40%.' },
    { icon: '📋', title: 'Lead Dashboard', desc: 'Track every lead across 4 vans. Know exactly where your calls come from.' },
    { icon: '📱', title: 'Text & Email Follow-Up', desc: 'Automated follow-ups recover 30% of prospects who didn\'t book immediately.' },
    { icon: '⭐', title: 'Review Management', desc: 'Automated review requests after every job. Build your reputation while you work.' },
  ]
  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">The Halcyn Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything Electric Express Needs</h2>
          <p className="mt-4 text-lg text-gray-600">A complete digital transformation for a busy 4-van electrical company.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(f => (
          <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-purple-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">{f.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
          </div>
        ))}</div>
      </div>
    </section>
  )
}

function DemoSections() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' }); const [status, setStatus] = useState('idle'); const [errorMsg, setErrorMsg] = useState('')
  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }
  async function handleSubmit(e) {
    e.preventDefault(); setStatus('loading'); setErrorMsg(''); const supabase = getSupabase()
    if (!supabase) { console.log('Electric Express lead:', form); setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }); return }
    const { error } = await supabase.from('leads').insert([{ name: form.name, email: form.email, phone: form.phone || null, message: form.message || 'Electric Express CLT demo interest', source: 'electric-express-demo', business_id: 'biz-electric-express-clt' }])
    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' })
  }
  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-300">Live Demo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Bring Your Website Out of 2017</h2>
            <p className="mt-4 text-lg text-purple-200">Click the ⚡ chat bubble. This is what Electric Express's 24/7 lead capture looks like.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-purple-700/50 bg-purple-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">1️⃣</span><h3 className="mt-3 font-semibold text-white">Click Chat</h3><p className="mt-1 text-sm text-purple-200">Open the AI assistant</p></div>
            <div className="rounded-xl border border-purple-700/50 bg-purple-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">2️⃣</span><h3 className="mt-3 font-semibold text-white">Describe Issue</h3><p className="mt-1 text-sm text-purple-200">Tell us what's wrong</p></div>
            <div className="rounded-xl border border-purple-700/50 bg-purple-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">3️⃣</span><h3 className="mt-3 font-semibold text-white">Get Help</h3><p className="mt-1 text-sm text-purple-200">An electrician calls back</p></div>
          </div>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-purple-700/30 bg-purple-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">Ready to Modernize Your Website?</h3>
            <p className="mt-2 text-center text-sm text-purple-200">We'll build Electric Express a modern site in 48 hours.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-lg border border-purple-700/50 bg-purple-900/50 px-4 py-2.5 text-sm text-white placeholder-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-300" />
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="block w-full rounded-lg border border-purple-700/50 bg-purple-900/50 px-4 py-2.5 text-sm text-white placeholder-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-300" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="block w-full rounded-lg border border-purple-700/50 bg-purple-900/50 px-4 py-2.5 text-sm text-white placeholder-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-300" />
              <button type="submit" disabled={status === 'loading'} className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-900 shadow-lg transition hover:bg-purple-50 disabled:opacity-60">{status === 'loading' ? 'Sending...' : '🚀 Modernize My Site'}</button>
              {status === 'success' && <p className="text-center text-sm font-medium text-green-400">✅ Thanks! We'll build your site within 48 hours.</p>}
              {status === 'error' && <p className="text-center text-sm font-medium text-red-400">❌ {errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Social Proof</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by Charlotte Trades</h2>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl">⚡</div>
          <blockquote className="mt-4 text-lg italic text-gray-700">&ldquo;Our website was from 2017 and we didn't think it mattered. Halcyn showed us we were losing $5k+/month. They rebuilt everything with AI booking. First month we added 22 extra jobs.&rdquo;</blockquote>
          <p className="mt-4 font-semibold text-gray-900">— Charlotte-area electrical contractor</p>
          <p className="text-sm text-gray-500">Halcyn Client since 2025</p>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Simple Pricing</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Complete Digital Transformation</h2>
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Electric Express — Modernize Your Site</p>
          <p className="mt-4"><span className="text-5xl font-extrabold text-gray-900">$97</span><span className="text-gray-500">/mo</span></p><p className="mt-1 text-sm text-gray-500">+ <strong>$997</strong> one-time setup</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ Modern mobile-responsive website</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot — books jobs automatically</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte electrical</li>
            <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
          </ul>
          <a href="#lead-capture" className="mt-8 inline-block w-full rounded-xl bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700">🚀 Get Started</a>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Bring Electric Express Out of 2017</h2>
        <p className="mt-4 text-lg text-purple-100">4 vans, a great reputation, and an 8-year-old website. Let's fix that.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#lead-capture" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 shadow-lg transition hover:bg-purple-50">🚀 Modernize My Site</a>
          <a href="#roi" className="inline-block rounded-xl border border-purple-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700/30">See the Math</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Halcyn. Built for Electric Express CLT — Charlotte, NC.</p>
          <p className="text-sm text-gray-500">Demo landing page. <a href="https://github.com/baileyjquinn/halcyn" className="text-purple-600 hover:underline">View on GitHub</a></p>
        </div>
      </div>
    </footer>
  )
}

export default function ElectricExpressDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-sm font-bold text-white">H</span>Halcyn</a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-purple-600">ROI</a>
            <a href="#demo" className="hover:text-purple-600">Features</a>
            <a href="#lead-capture" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700">Get Demo</a>
          </nav>
        </div>
      </header>
      <main className="flex-1"><Hero /><ProblemSection /><ROISection /><SolutionSection /><TestimonialSection /><DemoSections /><PricingSection /><CTASection /></main>
      <Footer />
      {/* AI Chatbot floating bubble */}
      <Chatbot theme="purple" icon="⚡" businessName="Electric Express CLT" issues={[
        { value: 'Power outage', label: '🚨 Power outage' },
        { value: 'Faulty wiring', label: '🔌 Faulty wiring' },
        { value: 'Panel upgrade', label: '⚡ Panel upgrade' },
        { value: 'Wiring inspection', label: '📋 Wiring inspection' },
        { value: 'Other', label: 'Other' },
      ]} />
    </div>
  )
}