/**
 * Halcyn Stack — Switch between client demo templates
 *
 * Available templates:
 *   SouthEndPlumbingDemo — plumbing, dark blue
 *   HometownElectricDemo — electrician, amber/orange
 *   SteadfastPlumbingDemo — mechanical, red/urgency (security audit mode)
 *   DrainRightPlumbingDemo — plumbing, teal
 *   ElectricExpressDemo — electrician, purple
 *
 * Usage: ?demo=steadfast (or hometown, south-end, drain-right, electric-express, landscaping, admin)
 * Default: Landing page with links to all demos
 */

import { useState, useEffect } from 'react'
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

const themeClasses = {
  blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600' },
  amber: { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600' },
  red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600' },
  teal: { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600' },
  purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-600' },
  green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600' },
  cyan: { bg: 'bg-cyan-600', hover: 'hover:bg-cyan-700', text: 'text-cyan-600' },
}

function LandingPage() {
  const [visible, setVisible] = useState([])
  useEffect(() => {
    const entries = Object.entries(demos)
    entries.forEach(([key, demo], i) => {
      setTimeout(() => setVisible(v => [...v, key]), i * 100)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      {/* Nav */}
      <header className="border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">H</span>
            <span className="text-lg font-bold text-white">Halcyn Stack</span>
          </div>
          <a href="https://github.com/baileyjquinn/halcyn" target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-gray-600 px-4 py-1.5 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white">
            GitHub →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Modular Demo Framework
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          AI-Powered Small Business{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Demo Templates</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
          Select a client profile to see a fully built landing page with AI lead capture chatbot, ROI calculator, and Supabase integration.
        </p>
      </section>

      {/* Demo Cards Grid */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(demos).map(([key, demo]) => {
            const t = themeClasses[demo.theme]
            const isVisible = visible.includes(key)
            return (
              <a key={key} href={`?demo=${key}`}
                className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                } hover:border-gray-500/50 hover:shadow-xl hover:shadow-black/20`}>
                {/* Theme accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1 ${t.bg} opacity-60`} />
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${t.bg} text-lg`}>{demo.icon}</span>
                    <h3 className={`mt-4 text-lg font-semibold text-white`}>{demo.name}</h3>
                  </div>
                  <span className={`rounded-full ${t.bg}/10 px-2.5 py-0.5 text-xs font-medium ${t.text}`}>{demo.theme}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">View demo →</p>
              </a>
            )
          })}
        </div>

        {/* Quick links */}
        <div className="mx-auto mt-12 max-w-lg rounded-xl border border-gray-700/50 bg-gray-800/30 p-6 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-300">Quick links:</span>{' '}
            {Object.entries(demos).map(([key, demo], i) => (
              <span key={key}>
                {i > 0 && <span className="mx-1 text-gray-600">·</span>}
                <a href={`?demo=${key}`} className={`font-medium ${themeClasses[demo.theme].text} hover:underline`}>{demo.name}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Halcyn. Built for the AutoBiz Stack.</p>
        </div>
      </footer>
    </div>
  )
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
