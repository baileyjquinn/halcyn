import { useState, useEffect } from 'react'
import { getSupabase } from '../lib/supabase'

const ACCESS_CODE = 'halcyn2025'

const STATUSES = ['New', 'Contacted', 'Quoted', 'Closed Won', 'Closed Lost']

function AccessGate({ onAccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (code === ACCESS_CODE) {
      onAccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      <div className="w-full max-w-sm rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-bold text-white">H</span>
          <h1 className="mt-4 text-xl font-bold text-white">Lead Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Enter access code to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={e => { setCode(e.target.value); setError(false) }}
            placeholder="Access code"
            className={`block w-full rounded-lg border bg-gray-900/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 ${
              error ? 'border-red-500 ring-red-500/30' : 'border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/30'
            }`}
            autoFocus
          />
          {error && <p className="text-center text-xs text-red-400">❌ Incorrect code</p>}
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-600 hover:to-blue-700">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function sourceLabel(source) {
  if (!source) return '—'
  return source
    .replace(/^chatbot-/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function StatusBadge({ status }) {
  const colors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-amber-100 text-amber-800',
    'Quoted': 'bg-purple-100 text-purple-800',
    'Closed Won': 'bg-green-100 text-green-800',
    'Closed Lost': 'bg-red-100 text-red-800',
  }
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusUpdates, setStatusUpdates] = useState({})
  const [saving, setSaving] = useState({})
  const [filter, setFilter] = useState('all')
  const [sortDir, setSortDir] = useState('desc')

  useEffect(() => {
    if (!authenticated) return
    fetchLeads()
  }, [authenticated])

  async function fetchLeads() {
    setLoading(true)
    setError(null)
    const sb = getSupabase()
    if (!sb) {
      setError('Supabase not configured — connect to database in .env')
      setLoading(false)
      return
    }
    const { data, error: err } = await sb.from('leads').select('*').order('created_at', { ascending: false })
    if (err) {
      setError(err.message)
    } else {
      setLeads(data || [])
    }
    setLoading(false)
  }

  async function updateStatus(id, newStatus) {
    setSaving(s => ({ ...s, [id]: true }))
    const sb = getSupabase()
    if (!sb) return

    const { error: err } = await sb.from('leads').update({ status: newStatus }).eq('id', id)
    if (err) {
      // If 'status' column doesn't exist, fall back to local-only
      console.warn('Could not persist status to DB:', err.message)
    }

    // Optimistically update local state
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l))
    setSaving(s => ({ ...s, [id]: false }))
  }

  function handleStatusChange(id, newStatus) {
    setStatusUpdates(s => ({ ...s, [id]: newStatus }))
    updateStatus(id, newStatus)
  }

  const filteredLeads = leads.filter(l => filter === 'all' || (l.status || 'New') === filter)

  const stats = {
    total: leads.length,
    new: leads.filter(l => (l.status || 'New') === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    won: leads.filter(l => l.status === 'Closed Won').length,
  }

  if (!authenticated) {
    return <AccessGate onAccess={() => setAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white">H</span>
            <span className="text-lg font-bold text-gray-900">Lead Dashboard</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">{leads.length} leads</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchLeads} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
              ↻ Refresh
            </button>
            <a href="/" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50">
              ← Back
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Leads</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600">New</p>
            <p className="mt-1 text-3xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-600">Contacted</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">{stats.contacted}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-green-600">Closed Won</p>
            <p className="mt-1 text-3xl font-bold text-green-600">{stats.won}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Filter:</span>
          {['all', 'New', 'Contacted', 'Quoted', 'Closed Won', 'Closed Lost'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-cyan-500" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-600">❌ {error}</p>
            <button onClick={fetchLeads} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Retry</button>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <span className="text-4xl">📋</span>
            <p className="mt-3 font-semibold text-gray-900">No leads yet</p>
            <p className="mt-1 text-sm text-gray-500">Leads will appear here once captured through the demo templates.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="transition hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatDate(lead.created_at)}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{lead.name || '—'}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} className="text-cyan-600 hover:underline">{lead.email}</a>
                      ) : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="text-gray-700 hover:text-cyan-600">{lead.phone}</a>
                      ) : '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {sourceLabel(lead.source)}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-600">{lead.message || '—'}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status || 'New'}
                          onChange={e => handleStatusChange(lead.id, e.target.value)}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {saving[lead.id] && <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-200 border-t-cyan-500" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Halcyn — Lead Management Dashboard</p>
        </div>
      </footer>
    </div>
  )
}