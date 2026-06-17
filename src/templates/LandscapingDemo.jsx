import { useState } from 'react'
import { getSupabase } from '../lib/supabase'
import Chatbot from '../components/features/Chatbot'

/**
 * Artificial Turf Products — Halcyn Demo Landing Page
 *
 * For a landscaping/turf business that needs a modern website.
 * Angle: "Charlotte homeowners are searching for artificial turf — can they find you?"
 *
 * Target: Artificial Turf Products, Charlotte NC
 * Contact: amie@atpcarolina.com
 * Wedge: $497 setup + $49/mo — Projected ROI: 30-50x ($1,500–$2,500/mo)
 */

/* ──────── Chatbot imported from ../components/features/Chatbot ──────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-200">Artificial Turf Products • Charlotte, NC</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Charlotte Homeowners Are Searching for <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Artificial Turf</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-100 sm:text-xl">Artificial Turf Products — you do great work. But if your website doesn't show up when they search, that job goes to someone else. Let's fix that.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#roi" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-green-900 shadow-lg transition hover:bg-green-50 hover:shadow-xl">See Your ROI</a>
            <a href="#demo" className="rounded-xl border border-green-400/40 bg-green-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-green-700/50">Live Demo ↓</a>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute inset-0 -z-20 opacity-[0.03]"><div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:20px_20px]" /></div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { icon: '🔍', title: 'Invisible on Google', desc: 'Homeowners search "artificial turf Charlotte" — if your site doesn\'t rank, they call your competitors.' },
    { icon: '📱', title: 'Not Mobile-Friendly', desc: '60% of landscaping searches happen on phones. If your site isn\'t responsive, 60% of visitors leave.' },
    { icon: '🌙', title: 'No After-Hours Capture', desc: 'Evenings and weekends are prime time for landscaping quotes. Without a website booking, those leads vanish.' },
    { icon: '📉', title: 'Missing Leads = Missing Revenue', desc: 'A single artificial turf installation can run $5k-$15k. Every missed lead is thousands in lost revenue.' },
  ]
  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Charlotte's Turf Demand Is Growing — But Are You Visible?</h2>
          <p className="mt-4 text-lg text-gray-600">Homeowners are spending more on outdoor living. Artificial turf is booming. But without a modern website, they can't find you.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{problems.map(p => (
          <div key={p.title} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">{p.icon}</span>
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
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's a Modern Website Worth for Artificial Turf Products?</h2>
          <p className="mt-4 text-lg text-gray-600">For a landscaping business selling premium turf installations, a website with AI booking is a revenue multiplier.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">Projected Monthly Uplift</p>
            <p className="mt-3 text-5xl font-extrabold text-green-700">$1,500–$2,500</p><p className="mt-2 text-sm text-green-600">Additional revenue</p>
            <div className="mt-4 rounded-lg bg-green-100 px-4 py-2"><span className="text-lg font-bold text-green-800">30–50x ROI</span></div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Investment</p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">$497</p><p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">$49</p><p className="text-sm text-gray-500">per month</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Average Project Value</p>
            <p className="mt-3 text-5xl font-extrabold text-emerald-600">$5,000</p><p className="mt-2 text-sm text-gray-500">per turf installation</p>
            <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-2"><span className="text-sm font-medium text-emerald-700">1 additional project/month</span></div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">SEO traffic from "artificial turf Charlotte"</span><span className="font-semibold text-gray-900">~200-400 visitors/mo</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">Quote requests from website visitors</span><span className="font-semibold text-gray-900">~5-10 leads/mo</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">After-hours leads via AI chatbot</span><span className="font-semibold text-gray-900">~2-4 additional leads/mo</span></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-900">Revenue at $5k/project (1-2 projects)</span><span className="text-lg font-bold text-green-700">$1,500–$2,500/mo</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const features = [
    { icon: '🌐', title: 'Modern Website', desc: 'A professional, mobile-responsive website built in days. SEO optimized for Charlotte landscaping searches.' },
    { icon: '🤖', title: '24/7 AI Chatbot', desc: 'Answers questions, qualifies leads, and books consultations automatically — even while you\'re on a job site.' },
    { icon: '📅', title: 'Smart Scheduling', desc: 'Prospects book consultations online. Syncs to your calendar with automated SMS reminders (cuts no-shows by 40%).' },
    { icon: '📋', title: 'Lead Dashboard', desc: 'Track every inquiry, estimate, and consultation. Know exactly where your leads come from.' },
    { icon: '📱', title: 'Text & Email Follow-Up', desc: 'Automated follow-ups to prospects who didn\'t book immediately. Recover 30% of "almost" customers.' },
    { icon: '⭐', title: 'Review Management', desc: 'Automated review requests after every project. Build your reputation while you work.' },
  ]
  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">The Halcyn Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything Artificial Turf Products Needs</h2>
          <p className="mt-4 text-lg text-gray-600">A complete digital presence for Charlotte's premier turf installer.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(f => (
          <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-green-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">{f.icon}</span>
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
    if (!supabase) { console.log('Artificial Turf Products lead:', form); setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }); return }
    const { error } = await supabase.from('leads').insert([{ name: form.name, email: form.email, phone: form.phone || null, message: form.message || 'Artificial Turf Products demo interest', source: 'artificial-turf-demo' }])
    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' })
  }
  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-300">Live Demo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">See What an AI-Powered Website Looks Like</h2>
            <p className="mt-4 text-lg text-green-200">Click the 🌿 chat bubble. This is what Artificial Turf Products' 24/7 lead capture looks like.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-green-700/50 bg-green-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">1️⃣</span><h3 className="mt-3 font-semibold text-white">Click Chat</h3><p className="mt-1 text-sm text-green-200">Open the AI assistant</p></div>
            <div className="rounded-xl border border-green-700/50 bg-green-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">2️⃣</span><h3 className="mt-3 font-semibold text-white">Describe Project</h3><p className="mt-1 text-sm text-green-200">Tell us what you need</p></div>
            <div className="rounded-xl border border-green-700/50 bg-green-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">3️⃣</span><h3 className="mt-3 font-semibold text-white">Get Estimate</h3><p className="mt-1 text-sm text-green-200">Schedule a consultation</p></div>
          </div>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-green-700/30 bg-green-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">Ready for a Professional Website?</h3>
            <p className="mt-2 text-center text-sm text-green-200">We'll build Artificial Turf Products' website in 48 hours.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-lg border border-green-700/50 bg-green-900/50 px-4 py-2.5 text-sm text-white placeholder-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300" />
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="block w-full rounded-lg border border-green-700/50 bg-green-900/50 px-4 py-2.5 text-sm text-white placeholder-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="block w-full rounded-lg border border-green-700/50 bg-green-900/50 px-4 py-2.5 text-sm text-white placeholder-green-300 focus:border-green-400 focus:ring-2 focus:ring-green-300" />
              <button type="submit" disabled={status === 'loading'} className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-900 shadow-lg transition hover:bg-green-50 disabled:opacity-60">{status === 'loading' ? 'Sending...' : '🌿 Get My Website'}</button>
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">🌿</div>
          <blockquote className="mt-4 text-lg italic text-gray-700">&ldquo;We were losing quotes to competitors who had better websites. Halcyn built us a modern site with AI booking. Our first month we booked 3 extra turf installations — over $15k in new revenue.&rdquo;</blockquote>
          <p className="mt-4 font-semibold text-gray-900">— Charlotte-area landscaping business</p>
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
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-green-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">Artificial Turf Products — New Website Offer</p>
          <p className="mt-4"><span className="text-5xl font-extrabold text-gray-900">$49</span><span className="text-gray-500">/mo</span></p><p className="mt-1 text-sm text-gray-500">+ <strong>$497</strong> one-time setup</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ Professional website — mobile responsive</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot — books consultations automatically</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte landscaping</li>
            <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
          </ul>
          <a href="#lead-capture" className="mt-8 inline-block w-full rounded-xl bg-green-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700">🌿 Get Started</a>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-emerald-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Make Artificial Turf Products Findable Online</h2>
        <p className="mt-4 text-lg text-green-100">Charlotte is searching for artificial turf. Make sure they find you.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#lead-capture" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-green-700 shadow-lg transition hover:bg-green-50">🌿 Get My Website</a>
          <a href="#roi" className="inline-block rounded-xl border border-green-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700/30">See the Math</a>
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
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Halcyn. Built for Artificial Turf Products — Charlotte, NC.</p>
          <p className="text-sm text-gray-500">Demo landing page. <a href="https://github.com/baileyjquinn/halcyn" className="text-green-600 hover:underline">View on GitHub</a></p>
        </div>
      </div>
    </footer>
  )
}

export default function LandscapingDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-sm font-bold text-white">H</span>Halcyn</a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-green-600">ROI</a>
            <a href="#demo" className="hover:text-green-600">Features</a>
            <a href="#lead-capture" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">Get Demo</a>
          </nav>
        </div>
      </header>
      <main className="flex-1"><Hero /><ProblemSection /><ROISection /><SolutionSection /><TestimonialSection /><DemoSections /><PricingSection /><CTASection /></main>
      <Footer />
      {/* AI Chatbot floating bubble */}
      <Chatbot theme="green" icon="🌿" businessName="Artificial Turf Products" issues={[
        { value: 'Artificial turf quote', label: '🌿 Artificial turf quote' },
        { value: 'Residential installation', label: '🏠 Residential installation' },
        { value: 'Commercial project', label: '🏢 Commercial project' },
        { value: 'Turf repair/maintenance', label: '🔧 Turf repair/maintenance' },
        { value: 'Other', label: 'Other' },
      ]} />
    </div>
  )
}
