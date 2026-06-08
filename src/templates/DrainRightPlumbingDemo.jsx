import { useState, useRef, useEffect } from 'react'
import { getSupabase } from '../lib/supabase'

/**
 * Drain Right Plumbing — Halcyn Demo Landing Page
 *
 * For a business with ONLY a Facebook page — no website at all.
 * Angle: "Facebook isn't a website — 40% of customers won't call without one"
 *
 * Target: 2-van plumbing operation, Charlotte NC
 * Wedge: $497 setup + $49/mo — Projected ROI: 40-61x ($2,000–$3,000/mo)
 */

function ChatBubble() {
  const [open, setOpen] = useState(false); const [step, setStep] = useState(0)
  const [name, setName] = useState(''); const [phone, setPhone] = useState('')
  const [issue, setIssue] = useState(''); const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false); const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const botMessages = ["Hi there! 💧 Plumber needed? Tell me what's up.", "What's your name?", "And a phone number?", "Last — what's the issue?"]
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [step, submitted])
  function handleUserResponse(v) { if (step === 1) setName(v); else if (step === 2) setPhone(v); else if (step === 3) setIssue(v); if (step < 3) setStep(s => s + 1) }
  async function handleSubmit() {
    setSending(true); setError(''); const supabase = getSupabase()
    const lead = { name, email: 'demo@drainrightplumbing.com', phone, message: `Issue: ${issue} | Drain Right Demo`, source: 'chatbot-drain-right' }
    if (!supabase) { console.log('Lead:', lead); setSubmitted(true); setSending(false); return }
    const { error: err } = await supabase.from('leads').insert([lead])
    if (err) setError(err.message); else setSubmitted(true); setSending(false)
  }
  function resetChat() { setStep(0); setSubmitted(false); setName(''); setPhone(''); setIssue(''); setError('') }
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (<div className="w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center gap-3 rounded-t-2xl bg-teal-600 px-4 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-lg font-bold">🤖</div>
          <div><p className="text-sm font-semibold">Halcyn AI Assistant</p><p className="text-xs text-teal-200">Online • 24/7</p></div>
        </div>
        <div className="h-72 space-y-3 overflow-y-auto p-4">
          {!submitted ? (<>
            <div className="flex"><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">{botMessages[step]}</div></div>
            <div className="mt-2">
              {step === 0 && <button onClick={() => handleUserResponse('yes')} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700">💧 I need a plumber</button>}
              {step === 1 && <input type="text" placeholder="Your name..." value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && name && handleUserResponse(name)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200" autoFocus />}
              {step === 2 && <input type="tel" placeholder="(704) 555-..." value={phone} onChange={e => setPhone(e.target.value)} onKeyDown={e => e.key === 'Enter' && phone && handleUserResponse(phone)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200" autoFocus />}
              {step === 3 && (<div className="space-y-2"><select value={issue} onChange={e => setIssue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200"><option value="">Select...</option><option value="Burst pipe">🚨 Burst pipe</option><option value="Water heater">🔥 Water heater</option><option value="Clogged drain">🚿 Clogged drain</option><option value="Leaky faucet">💧 Leaky faucet</option><option value="Other">Other</option></select>{issue && <button onClick={handleSubmit} disabled={sending} className="mt-2 w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60">{sending ? 'Sending...' : '✅ Get Help'}</button>}</div>)}
              {step > 0 && step < 3 && <button onClick={() => handleUserResponse('')} className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700">Continue →</button>}
            </div>
          </>) : (<div className="flex flex-col items-center justify-center py-8 text-center"><div className="mb-3 text-4xl">✅</div><p className="font-semibold text-gray-900">Help is coming!</p><p className="mt-1 text-sm text-gray-600">A plumber will call <strong>{phone}</strong>.</p><button onClick={resetChat} className="mt-4 text-sm font-medium text-teal-600 hover:underline">New request</button></div>)}
          {error && <p className="text-center text-sm text-red-600">❌ {error}</p>}
        </div>
      </div>)}
      <button onClick={() => setOpen(!open)} className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-2xl text-white shadow-lg transition hover:bg-teal-700">💬</button>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-200">Drain Right Plumbing • Charlotte, NC</span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Your Business Deserves More Than <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Just Facebook</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-teal-100 sm:text-xl">A Facebook page isn't a website. 40% of customers won't hire a plumber without a professional site. Let's build yours.</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#roi" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-teal-900 shadow-lg transition hover:bg-teal-50 hover:shadow-xl">See Your ROI</a>
            <a href="#demo" className="rounded-xl border border-teal-400/40 bg-teal-800/50 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-teal-700/50">Live Demo ↓</a>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute inset-0 -z-20 opacity-[0.03]"><div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,_transparent_1px)] bg-[length:20px_20px]" /></div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { icon: '📘', title: 'Facebook Isn\'t a Website', desc: 'A Facebook page doesn\'t show up in Google search results. Customers searching "plumber near me" find your competitors first.' },
    { icon: '📉', title: '40% Won\'t Call Without a Site', desc: 'Studies show 40% of customers won\'t hire a business that doesn\'t have a professional website. Every day without one = lost revenue.' },
    { icon: '🌙', title: 'No After-Hours Capture', desc: 'Facebook can\'t book jobs for you. When customers need a plumber at 9 PM, they call a business with a website and 24/7 booking.' },
    { icon: '🔍', title: 'Invisible on Google', desc: 'Competitors with websites show up above you in search. Drain Right has quality service — but nobody can find it online.' },
  ]
  return (
    <section id="problem" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-red-600">The Problem</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Facebook Alone Is Costing You Customers</h2>
          <p className="mt-4 text-lg text-gray-600">A Facebook page is better than nothing — but it's not enough in 2025. Customers expect a professional website.</p>
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
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">The Opportunity</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What's a Professional Website Worth?</h2>
          <p className="mt-4 text-lg text-gray-600">For a 2-van plumbing business going from Facebook-only to a full digital presence.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Projected Monthly Uplift</p>
            <p className="mt-3 text-5xl font-extrabold text-teal-700">$2,000–$3,000</p><p className="mt-2 text-sm text-teal-600">Additional revenue</p>
            <div className="mt-4 rounded-lg bg-teal-100 px-4 py-2"><span className="text-lg font-bold text-teal-800">40–61x ROI</span></div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Your Investment</p>
            <p className="mt-3 text-4xl font-extrabold text-gray-900">$497</p><p className="text-sm text-gray-500">one-time setup</p>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">$49</p><p className="text-sm text-gray-500">per month</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Average Job Value</p>
            <p className="mt-3 text-5xl font-extrabold text-teal-600">$250</p><p className="mt-2 text-sm text-gray-500">per service call</p>
            <div className="mt-4 rounded-lg bg-teal-50 px-4 py-2"><span className="text-sm font-medium text-teal-700">8–12 additional jobs/month</span></div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-center text-lg font-semibold text-gray-900">How the Math Works</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">Customers who won't call without a website</span><span className="font-semibold text-gray-900">~40% of prospects lost</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">New customers found via Google SEO</span><span className="font-semibold text-gray-900">~5-8 new leads/mo</span></div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3"><span className="text-sm text-gray-600">After-hours bookings via AI chatbot</span><span className="font-semibold text-gray-900">~3-5 additional jobs/mo</span></div>
            <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-900">Revenue at $250/job</span><span className="text-lg font-bold text-teal-700">$2,000–$3,000/mo</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const features = [
    { icon: '🌐', title: 'Professional Website', desc: 'Mobile-first design that looks great. Built in days, not weeks. SEO optimized for Charlotte plumbing searches.' },
    { icon: '🤖', title: '24/7 AI Chatbot', desc: 'Answers calls, qualifies leads, and books appointments automatically — even while you\'re on a job.' },
    { icon: '📅', title: 'Smart Scheduling', desc: 'Customers book online. Syncs to your calendar with automated SMS reminders (cuts no-shows by 40%).' },
    { icon: '📋', title: 'Lead Dashboard', desc: 'See every lead, booking, and customer interaction in one place. Know exactly where your calls come from.' },
    { icon: '📱', title: 'Text & Email Follow-Up', desc: 'Automated follow-ups to prospects who didn\'t book immediately. Recover 30% of "almost" customers.' },
    { icon: '⭐', title: 'Review Management', desc: 'Automated review requests after every job. Build your Google reputation while you work.' },
  ]
  return (
    <section id="demo" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">The Halcyn Solution</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything You Need to Grow Online</h2>
          <p className="mt-4 text-lg text-gray-600">A complete digital transformation for Drain Right Plumbing.</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(f => (
          <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-teal-100 hover:shadow-md">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl">{f.icon}</span>
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
    if (!supabase) { console.log('Drain Right lead:', form); setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' }); return }
    const { error } = await supabase.from('leads').insert([{ name: form.name, email: form.email, phone: form.phone || null, message: form.message || 'Drain Right Plumbing demo interest', source: 'drain-right-demo' }])
    if (error) { setStatus('error'); setErrorMsg(error.message); return }
    setStatus('success'); setForm({ name: '', email: '', phone: '', message: '' })
  }
  return (
    <section id="lead-capture" className="bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-teal-300">Live Demo</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Go from Facebook-Only to a Full Website</h2>
            <p className="mt-4 text-lg text-teal-200">Click the 💬 chat bubble. This is what Drain Right Plumbing's 24/7 website could look like.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-teal-700/50 bg-teal-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">1️⃣</span><h3 className="mt-3 font-semibold text-white">Click Chat</h3><p className="mt-1 text-sm text-teal-200">Open the AI assistant</p></div>
            <div className="rounded-xl border border-teal-700/50 bg-teal-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">2️⃣</span><h3 className="mt-3 font-semibold text-white">Describe Issue</h3><p className="mt-1 text-sm text-teal-200">Tell us what's wrong</p></div>
            <div className="rounded-xl border border-teal-700/50 bg-teal-800/30 p-6 text-center backdrop-blur-sm"><span className="text-3xl">3️⃣</span><h3 className="mt-3 font-semibold text-white">Get Help</h3><p className="mt-1 text-sm text-teal-200">A plumber calls back</p></div>
          </div>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-teal-700/30 bg-teal-900/50 p-8 backdrop-blur-sm">
            <h3 className="text-center text-xl font-bold text-white">Ready for a Professional Website?</h3>
            <p className="mt-2 text-center text-sm text-teal-200">We'll build Drain Right's website in 48 hours.</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="block w-full rounded-lg border border-teal-700/50 bg-teal-900/50 px-4 py-2.5 text-sm text-white placeholder-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-300" />
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address" className="block w-full rounded-lg border border-teal-700/50 bg-teal-900/50 px-4 py-2.5 text-sm text-white placeholder-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-300" />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="block w-full rounded-lg border border-teal-700/50 bg-teal-900/50 px-4 py-2.5 text-sm text-white placeholder-teal-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-300" />
              <button type="submit" disabled={status === 'loading'} className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg transition hover:bg-teal-50 disabled:opacity-60">{status === 'loading' ? 'Sending...' : '🚀 Get My Website'}</button>
              {status === 'success' && <p className="text-center text-sm font-medium text-green-400">✅ Thanks! We'll build your website within 48 hours.</p>}
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl">💬</div>
          <blockquote className="mt-4 text-lg italic text-gray-700">&ldquo;We were Facebook-only for 3 years. Halcyn built us a professional website with AI booking in 3 days. Our first month with a website we booked 9 extra jobs. I wish we'd done it years ago.&rdquo;</blockquote>
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
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border-2 border-teal-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Drain Right Plumbing — New Website Offer</p>
          <p className="mt-4"><span className="text-5xl font-extrabold text-gray-900">$49</span><span className="text-gray-500">/mo</span></p><p className="mt-1 text-sm text-gray-500">+ <strong>$497</strong> one-time setup</p>
          <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
            <li className="flex items-start gap-2">✅ Professional website — mobile responsive</li>
            <li className="flex items-start gap-2">✅ 24/7 AI chatbot — books jobs automatically</li>
            <li className="flex items-start gap-2">✅ Online scheduling with calendar sync</li>
            <li className="flex items-start gap-2">✅ SMS reminders (cut no-shows by 40%)</li>
            <li className="flex items-start gap-2">✅ Lead dashboard & analytics</li>
            <li className="flex items-start gap-2">✅ SEO optimized for Charlotte plumbing</li>
            <li className="flex items-start gap-2">✅ Hosting & maintenance included</li>
          </ul>
          <a href="#lead-capture" className="mt-8 inline-block w-full rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-700">🚀 Get Started</a>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-cyan-700 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Take Drain Right Beyond Facebook</h2>
        <p className="mt-4 text-lg text-teal-100">You do quality work. Let's make sure every Charlotte homeowner who needs a plumber can find you.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#lead-capture" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50">🚀 Get My Website</a>
          <a href="#roi" className="inline-block rounded-xl border border-teal-400/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-700/30">See the Math</a>
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
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Halcyn. Built for Drain Right Plumbing — Charlotte, NC.</p>
          <p className="text-sm text-gray-500">Demo landing page. <a href="https://github.com/baileyjquinn/halcyn" className="text-teal-600 hover:underline">View on GitHub</a></p>
        </div>
      </div>
    </section>
  )
}

export default function DrainRightPlumbingDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">H</span>Halcyn</a>
          <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <a href="#roi" className="hover:text-teal-600">ROI</a>
            <a href="#demo" className="hover:text-teal-600">Features</a>
            <a href="#lead-capture" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700">Get Demo</a>
          </nav>
        </div>
      </header>
      <main className="flex-1"><Hero /><ProblemSection /><ROISection /><SolutionSection /><TestimonialSection /><DemoSections /><PricingSection /><CTASection /></main>
      <Footer /><ChatBubble />
    </div>
  )
}