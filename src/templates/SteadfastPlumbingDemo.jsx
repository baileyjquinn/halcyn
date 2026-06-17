import { useState } from 'react'
import { getSupabase } from '../lib/supabase'
import Chatbot from '../components/features/Chatbot'

/**
 * Steadfast Plumbing NC — Halcyn Demo Landing Page
 *
 * For a business with a website that has a "Not Secure" warning and broken mobile form.
 * Angle: "Your website is actively scaring customers away"
 *
 * Target: 3-van plumbing operation, Charlotte NC
 * Wedge: $497 setup + $49/mo — Projected ROI: 56-84x ($2,750–$4,125/mo)
 */

/* ──────── Chatbot imported from ../components/features/Chatbot with securityAlert mode ──────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-rose-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-red-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-200">Steadfast Plumbing NC • Charlotte, NC</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Your Website Is <span className="bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent">Scaring Customers Away</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-100 sm:text-xl">Chrome shows a "Not Secure" warning on every page. Your mobile contact form doesn't work. In 2025, that's costing you thousands every month.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#roi" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-red-900 shadow-lg transition hover:bg-red-50 hover:shadow-xl">See Your ROI</a>
            <a href="#demo" className="rounded-xl border border-red-400/40 bg-red-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-red-700/50">Live Demo ↓</a>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="absolute inset-0 -z-20 opacity-[0.03]"><div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:20px_20px]" /></div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { icon: '🔴', title: '"Not Secure" Warning', desc: 'Chrome shows a red warning triangle to every visitor. 82% of users leave a site that shows this warning.' },
    { icon: '📱', title: 'Broken on Mobile', desc: 'Your contact form doesn\'t work on phones — where 60% of plumbing searches happen.' },
    { icon: '⏱️', title: 'Slow Load Times', desc: 'Your site takes 5-7 seconds to load. Every second = 20% fewer conversions.' },
    { icon: '🤖', title: 'No AI Booking', desc: 'No chatbot, no online scheduling, no after-hours capture. A 3-van operation is losing jobs every night.' },
  ]
  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Digital Presence Is Actively Costing You Customers</h2>
          <p className="mt-4 text-lg text-gray-600">A "Not Secure" warning, a broken mobile form, and no AI booking. Customers see the warning and call your competitor.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(p => (
            <div key={p.title} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-100 hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">{p.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
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
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's a Secure, Modern Website Worth?</h2>
          <p className="mt-4 text-lg text-gray-600">Fixing the "Not Secure" warning and adding AI booking for a 3-van plumbing operation.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Projected Monthly Uplift</p>
            <p className="mt-3 text-5xl font-extrabold text-green-700">$2,750–$4,125</p>
            <p className="mt-2 text-sm text-green-600">Additional revenue</p>
            <div className="mt-4 rounded-lg bg-green-100 px-4 py-2"><span className="text-lg font-bold text-green-800">56–84x ROI</span></div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Investment</p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">$497</p><p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">$49</p><p className="text-sm text-gray-500">per month</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Average Job Value</p>
            <p className="mt-3 text-5xl font-extrabold text-blue-600">$275</p><p className="mt-2 text-sm text-gray-500">per service call</p>
            <div className="mt-4 rounded-lg bg-blue-50 px-4 py-2"><span className="text-sm font-medium text-blue-700">10–15 additional jobs/month</span></div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">Customers leaving from "Not Secure" warning</span><span className="font-semibold text-gray-900">~40% bounce rate</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">Missed mobile form submissions</span><span className="font-semibold text-gray-900">~15-20 leads/mo lost</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">New jobs with fixed site + AI booking</span><span className="font-semibold text-gray-900">10–15 jobs</span></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-900">Revenue at $275/job</span><span className="text-lg font-bold text-green-700">$2,750–$4,125/mo</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const features = [
    { icon: '🔒', title: 'SSL + Secure Site', desc: 'Eliminate the "Not Secure" warning instantly. Chrome-verified HTTPS with automatic renewal.' },
    { icon: '📱', title: 'Mobile-First Design', desc: 'Responsive design that works perfectly on every device. Contact forms that actually submit on phones.' },
    { icon: '🤖', title: '24/7 AI Chatbot', desc: 'Answers calls, qualifies leads, and books appointments automatically — even while you\'re on a job.' },
    { icon: '📅', title: 'Smart Scheduling', desc: 'Customers book online. Syncs to your calendar with automated SMS reminders (cuts no-shows by 40%).' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-second load times on modern hosting. No more 5-7 second waits that cost you 20% of visitors.' },
    { icon: '📋', title: 'Lead Dashboard', desc: 'See every lead, booking, and customer interaction. Know exactly where your calls come from.' },
  ]
  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">The Halcyn Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything Steadfast Plumbing Needs</h2>
          <p className="mt-4 text-lg text-gray-600">Fix the security warning, modernize the design, add AI booking — all in one week.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(f => (
          <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-red-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">{f.icon}</span>
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
    if (!supabase) { console.log('Steadfast lead:', form); setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }); return }
    const { error } = await supabase.from('leads').insert([{ name: form.name, email: form.email, phone: form.phone || null, message: form.message || 'Steadfast Plumbing demo interest', source: 'steadfast-plumbing-demo' }])
    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' })
  }
  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-red-900 to-rose-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-red-300">Live Demo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">See What a Secure, Modern Site Looks Like</h2>
            <p className="mt-4 text-lg text-red-200">Click the 💬 chat bubble. This is what Steadfast Plumbing's 24/7 lead capture looks like.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-red-700/50 bg-red-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">1️⃣</span><h3 className="mt-3 font-semibold text-white">Click Chat</h3><p className="mt-1 text-sm text-red-200">Open the AI assistant</p></div>
            <div className="rounded-xl border border-red-700/50 bg-red-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">2️⃣</span><h3 className="mt-3 font-semibold text-white">Describe Issue</h3><p className="mt-1 text-sm text-red-200">Tell us what's wrong</p></div>
            <div className="rounded-xl border border-red-700/50 bg-red-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">3️⃣</span><h3 className="mt-3 font-semibold text-white">Get Help</h3><p className="mt-1 text-sm text-red-200">A plumber calls back</p></div>
          </div>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-700/30 bg-red-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">Fix Your Site — Get More Customers</h3>
            <p className="mt-2 text-center text-sm text-red-200">We'll eliminate the "Not Secure" warning and add AI booking in one week.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-lg border border-red-700/50 bg-red-900/50 px-4 py-2.5 text-sm text-white placeholder-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-300" />
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="block w-full rounded-lg border border-red-700/50 bg-red-900/50 px-4 py-2.5 text-sm text-white placeholder-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-300" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="block w-full rounded-lg border border-red-700/50 bg-red-900/50 px-4 py-2.5 text-sm text-white placeholder-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-300" />
              <button type="submit" disabled={status === 'loading'} className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-red-900 shadow-lg transition hover:bg-red-50 disabled:opacity-60">{status === 'loading' ? 'Sending...' : '🔒 Get My Demo Site'}</button>
              {status === 'success' && <p className="text-center text-sm font-medium text-green-400">✅ Thanks! We'll fix your site within 48 hours.</p>}
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">💬</div>
          <blockquote className="mt-4 text-lg italic text-gray-700">&ldquo;We didn't realize our "Not Secure" warning was costing us customers until we switched to Halcyn. They fixed the SSL, rebuilt our site with AI booking, and we added 12 extra jobs the first month.&rdquo;</blockquote>
          <p className="mt-4 font-semibold text-gray-900">— Charlotte-area plumbing business</p>
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
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">One Price. Everything Included.</h2>
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-red-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">Steadfast Plumbing — Fix Your Site Offer</p>
          <p className="mt-4"><span className="text-5xl font-extrabold text-gray-900">$49</span><span className="text-gray-500">/mo</span></p>
          <p className="mt-1 text-sm text-gray-500">+ <strong>$497</strong> one-time setup</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ SSL certificate installed</li>
            <li className="flex items-start gap-2">✅ Mobile-responsive website</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte plumbing</li>
            <li className="flex items-start gap-2">✅ Hosting, maintenance & SSL renewal</li>
          </ul>
          <a href="#lead-capture" className="mt-8 inline-block w-full rounded-xl bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700">🔒 Get Started</a>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-rose-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Fix Your "Not Secure" Warning Today</h2>
        <p className="mt-4 text-lg text-red-100">Steadfast Plumbing — you do great work. Let's make sure your website reflects that.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#lead-capture" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-red-700 shadow-lg transition hover:bg-red-50">🔒 Get My Demo Site</a>
          <a href="#roi" className="inline-block rounded-xl border border-red-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700/30">See the Math</a>
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
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Halcyn. Built for Steadfast Plumbing NC — Charlotte, NC.</p>
          <p className="text-sm text-gray-500">Demo landing page. <a href="https://github.com/baileyjquinn/halcyn" className="text-red-600 hover:underline">View on GitHub</a></p>
        </div>
      </div>
    </footer>
  )
}

export default function SteadfastPlumbingDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white">H</span>Halcyn</a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-red-600">ROI</a>
            <a href="#demo" className="hover:text-red-600">Features</a>
            <a href="#lead-capture" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">Get Demo</a>
          </nav>
        </div>
      </header>
      <main className="flex-1"><Hero /><ProblemSection /><ROISection /><SolutionSection /><TestimonialSection /><DemoSections /><PricingSection /><CTASection /></main>
      <Footer />
      {/* AI Chatbot with Security Audit mode — leads with "Not Secure" warning */}
      <Chatbot theme="red" icon="🔒" businessName="Steadfast Plumbing NC" securityAlert issues={[
        { value: 'Burst pipe', label: '🚨 Burst pipe' },
        { value: 'Water heater', label: '🔥 Water heater' },
        { value: 'Clogged drain', label: '🚿 Clogged drain' },
        { value: 'Leaky faucet', label: '💧 Leaky faucet' },
        { value: 'Sewer backup', label: '⚠️ Sewer backup' },
        { value: 'Other', label: 'Other' },
      ]} />
    </div>
  )
}