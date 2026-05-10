'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'

export default function DemosLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    posthog.capture('demos_login_attempted')

    const res = await fetch('/api/demos-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/demos')
    } else {
      posthog.capture('demos_login_failed')
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <span className="block text-tbh-honey text-xs tracking-[0.3em] uppercase mb-4">
          Private Access
        </span>
        <h1 className="font-display text-4xl text-tbh-cream uppercase mb-8">Demos</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-tbh-tan text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-tbh-dark border border-tbh-brown text-tbh-cream px-4 py-3 focus:outline-none focus:border-tbh-honey transition-colors"
            />
          </div>

          {error && <p className="text-tbh-rust text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 bg-tbh-honey text-tbh-black font-display tracking-widest uppercase text-sm hover:bg-tbh-tan transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
