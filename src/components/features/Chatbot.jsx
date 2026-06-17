import { useState, useRef, useEffect } from 'react'
import { getSupabase } from '../../lib/supabase'
import config from '../../lib/config'

/**
 * Halcyn Chatbot — Reusable AI lead capture bubble
 *
 * Props:
 *   - theme: 'blue' | 'amber' | 'red' | 'teal' | 'purple'  (color theme)
 *   - icon: string (emoji for the FAB button, default '💬')
 *   - businessName: string (used in lead source)
 *   - securityAlert: boolean (when true, Steadfast-style intro)
 *   - issues: array of {value, label} for the issue dropdown
 *   - customIntro: string (custom first bot message)
 */

const themeMap = {
  blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', ring: 'focus:ring-blue-200', border: 'focus:border-blue-500', light: 'bg-blue-50', text: 'text-blue-200' },
  amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', ring: 'focus:ring-amber-200', border: 'focus:border-amber-500', light: 'bg-amber-50', text: 'text-amber-200' },
  red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', ring: 'focus:ring-red-200', border: 'focus:border-red-500', light: 'bg-red-50', text: 'text-red-200' },
  teal: { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', ring: 'focus:ring-teal-200', border: 'focus:border-teal-500', light: 'bg-teal-50', text: 'text-teal-200' },
  purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', ring: 'focus:ring-purple-200', border: 'focus:border-purple-500', light: 'bg-purple-50', text: 'text-purple-200' },
}

const defaultIssues = [
  { value: 'Emergency', label: '🚨 Emergency' },
  { value: 'General service', label: '🔧 General service' },
  { value: 'Quote', label: '💰 Request a quote' },
  { value: 'Other', label: 'Other' },
]

function getBotMessages(securityAlert) {
  if (securityAlert) {
    return [
      "I noticed your current website is showing a 'Not Secure' warning. I can fix that and set up this booking system for you in one go. Ready to start?",
      "Great! What's your name?",
      "Perfect — and your phone number?",
      "Last thing — what issue are you dealing with?",
    ]
  }
  return [
    "Hi there! Need help? Tell me what's going on and I'll connect you right away.",
    "Great! What's your name?",
    "And a phone number so we can reach you?",
    "One last thing — what's the issue?",
  ]
}

const initialForm = { name: '', phone: '', issue: '' }

export default function Chatbot({ theme = 'blue', icon = '💬', businessName = 'client', securityAlert = false, issues = defaultIssues, customIntro }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const t = themeMap[theme] || themeMap.blue
  const botMessages = customIntro ? [customIntro, ...getBotMessages(false).slice(1)] : getBotMessages(securityAlert)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [step, submitted])

  function handleUserResponse(value) {
    if (step === 1) setForm(f => ({ ...f, name: value }))
    else if (step === 2) setForm(f => ({ ...f, phone: value }))
    else if (step === 3) setForm(f => ({ ...f, issue: value }))
    if (step < 3) setStep(s => s + 1)
  }

  async function handleSubmit() {
    setSending(true); setError('')
    const supabase = getSupabase()
    const lead = {
      name: form.name,
      email: 'lead@demo.local',
      phone: form.phone,
      message: `Issue: ${form.issue} | Source: Chatbot - ${businessName}`,
      source: `chatbot-${businessName.toLowerCase().replace(/\s+/g, '-')}`,
    }
    if (!supabase) { console.log('Lead:', lead); setSubmitted(true); setSending(false); return }
    const { error: err } = await supabase.from('leads').insert([lead])
    if (err) setError(err.message); else setSubmitted(true)
    setSending(false)
  }

  function resetChat() { setStep(0); setSubmitted(false); setForm(initialForm); setError('') }

  const fabBg = t.bg + ' ' + t.hover

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className={`flex items-center gap-3 rounded-t-2xl ${t.bg} px-4 py-3 text-white`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.bg.replace('600','500')} text-lg font-bold`}>🤖</div>
            <div>
              <p className="text-sm font-semibold">Halcyn AI Assistant</p>
              <p className={`text-xs ${t.text}`}>Online • 24/7</p>
            </div>
          </div>
          <div className="h-72 space-y-3 overflow-y-auto p-4">
            {!submitted ? (
              <>
                <div className="flex">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-2.5 text-sm text-gray-800">{botMessages[step]}</div>
                </div>
                <div className="mt-2">
                  {step === 0 && (
                    <button onClick={() => handleUserResponse('yes')} className={`rounded-xl ${t.bg} px-4 py-2 text-sm font-medium text-white transition ${t.hover}`}>
                      {securityAlert ? '🔒 Yes, fix my site!' : '✅ Yes, I need help'}
                    </button>
                  )}
                  {step === 1 && (
                    <input type="text" placeholder="Your name..." value={form.name}
                      onChange={e => setForm(f => ({...f, name: e.target.value}))}
                      onKeyDown={e => e.key === 'Enter' && form.name && handleUserResponse(form.name)}
                      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm ${t.ring} ${t.border}`} autoFocus />
                  )}
                  {step === 2 && (
                    <input type="tel" placeholder="(704) 555-..." value={form.phone}
                      onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                      onKeyDown={e => e.key === 'Enter' && form.phone && handleUserResponse(form.phone)}
                      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm ${t.ring} ${t.border}`} autoFocus />
                  )}
                  {step === 3 && (
                    <div className="space-y-2">
                      <select value={form.issue} onChange={e => setForm(f => ({...f, issue: e.target.value}))}
                        className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm ${t.ring} ${t.border}`}>
                        <option value="">Select...</option>
                        {issues.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                      </select>
                      {form.issue && (
                        <button onClick={handleSubmit} disabled={sending}
                          className="mt-2 w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60">
                          {sending ? 'Sending...' : '✅ Get Help Now'}
                        </button>
                      )}
                    </div>
                  )}
                  {(step > 0 && step < 3 && !(step === 1 && !form.name) && !(step === 2 && !form.phone)) && (
                    <button onClick={() => {
                      if (step === 1 && form.name) handleUserResponse(form.name)
                      else if (step === 2 && form.phone) handleUserResponse(form.phone)
                    }} className={`mt-2 w-full rounded-xl ${t.bg} px-4 py-2 text-sm font-semibold text-white transition ${t.hover}`}>
                      Continue →
                    </button>
                  )}
                  {step === 1 && form.name && (
                    <button onClick={() => handleUserResponse(form.name)} className={`mt-2 w-full rounded-xl ${t.bg} px-4 py-2 text-sm font-semibold text-white transition ${t.hover}`}>Continue →</button>
                  )}
                  {step === 2 && form.phone && (
                    <button onClick={() => handleUserResponse(form.phone)} className={`mt-2 w-full rounded-xl ${t.bg} px-4 py-2 text-sm font-semibold text-white transition ${t.hover}`}>Continue →</button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-3 text-4xl">✅</div>
                <p className="font-semibold text-gray-900">Help is on the way!</p>
                <p className="mt-1 text-sm text-gray-600">A pro will call <strong>{form.phone}</strong> shortly.</p>
                <div className="mt-4 space-y-2">
                  <a href={config.payments.setupLink} target="_blank" rel="noopener noreferrer"
                    className={`inline-block w-full rounded-xl ${t.bg} px-5 py-2.5 text-sm font-semibold text-white transition ${t.hover}`}>
                    💳 Pay Setup — Get Started Today
                  </a>
                  <p className="text-xs text-gray-400">Secure payment via Stripe • 30-day money-back guarantee</p>
                </div>
                <button onClick={resetChat} className={`mt-3 text-sm font-medium ${t.bg.replace('bg-','text-').replace('-600','-600')} hover:underline`}>Start new request</button>
              </div>
            )}
            {error && <p className="text-center text-sm text-red-600">❌ {error}</p>}
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className={`flex h-14 w-14 items-center justify-center rounded-full ${fabBg} text-2xl text-white shadow-lg transition hover:shadow-xl`}>
        {open ? '✕' : icon}
      </button>
    </div>
  )
}