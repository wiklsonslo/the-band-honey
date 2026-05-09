'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  return (
    <>
      {/* Hero image — top half */}
      <div className="relative h-64 md:h-[45vh] w-full">
        <Image
          src="/images/couchpic.jpg"
          alt="Contact"
          fill
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-tbh-black/30" />
      </div>

      {/* Contact section */}
      <div className="bg-tbh-cream min-h-[50vh] px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-tbh-black uppercase mb-10">Contact</h1>

          {status === 'sent' ? (
            <p className="font-display text-tbh-rust text-2xl uppercase">Message sent. We&apos;ll be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-tbh-dark text-xs lowercase mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-white border border-tbh-tan text-tbh-black px-4 py-3 rounded-full focus:outline-none focus:border-tbh-honey transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-tbh-dark text-xs lowercase mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-white border border-tbh-tan text-tbh-black px-4 py-3 rounded-full focus:outline-none focus:border-tbh-honey transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-tbh-dark text-xs lowercase mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white border border-tbh-tan text-tbh-black px-4 py-3 rounded-2xl focus:outline-none focus:border-tbh-honey transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-tbh-rust text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-2.5 rounded-full bg-tbh-brown text-tbh-cream font-display tracking-widest uppercase text-sm hover:bg-tbh-rust transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
