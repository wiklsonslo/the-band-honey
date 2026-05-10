'use client'

import posthog from 'posthog-js'
import type { Show } from '@/sanity/queries'

export function ShowRow({ show }: { show: Show }) {
  const date = new Date(show.date)
  return (
    <div className="flex items-center justify-between bg-tbh-tan/40 rounded-full px-8 py-5 gap-4">
      <div className="flex items-baseline gap-4 min-w-0">
        <span className="font-display text-tbh-black text-lg uppercase shrink-0">
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-tbh-dark text-sm lowercase truncate">
          {show.venue}{show.city ? `, ${show.city}` : ''}
        </span>
      </div>

      {show.soldOut ? (
        <span className="text-tbh-dark text-xs lowercase shrink-0">Sold Out</span>
      ) : show.ticketUrl ? (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            posthog.capture('ticket_link_clicked', {
              venue: show.venue,
              city: show.city,
              date: show.date,
              ticket_url: show.ticketUrl,
            })
          }
          className="shrink-0 px-5 py-1.5 rounded-full bg-tbh-brown text-tbh-cream text-xs tracking-widest uppercase hover:bg-tbh-rust transition-colors"
        >
          Tickets
        </a>
      ) : null}
    </div>
  )
}
