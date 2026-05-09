import Link from 'next/link'
import type { Show } from '@/sanity/queries'

type Props = { shows: Show[] }

export function UpcomingShows({ shows }: Props) {
  return (
    <section className="bg-tbh-cream py-16 px-6">
      <h2 className="font-display text-2xl text-tbh-black text-center tracking-widest uppercase mb-10">
        Upcoming Shows
      </h2>

      <div className="max-w-3xl mx-auto space-y-3">
        {shows?.length ? (
          shows.map((show) => {
            const date = new Date(show.date)
            return (
              <div
                key={show._id}
                className="flex items-center justify-between bg-tbh-tan/50 rounded-full px-6 py-4 gap-4"
              >
                <div className="flex items-baseline gap-4 min-w-0">
                  <span className="font-display text-tbh-black text-lg uppercase shrink-0">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-tbh-dark text-sm tracking-widest uppercase truncate">
                    {show.venue}{show.city ? `, ${show.city}` : ''}
                  </span>
                </div>

                {show.soldOut ? (
                  <span className="text-tbh-dark text-xs tracking-widest uppercase shrink-0">
                    Sold Out
                  </span>
                ) : show.ticketUrl ? (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-5 py-1.5 rounded-full bg-tbh-brown text-tbh-cream text-xs tracking-widest uppercase hover:bg-tbh-rust transition-colors"
                  >
                    Tickets
                  </a>
                ) : null}
              </div>
            )
          })
        ) : (
          /* Placeholder rows matching wireframe */
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between bg-tbh-tan/50 rounded-full px-6 py-4 gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-tbh-black text-lg uppercase">Date</span>
                <span className="text-tbh-dark text-sm tracking-widest uppercase">Location</span>
              </div>
              <span className="px-5 py-1.5 rounded-full bg-tbh-brown/40 text-tbh-dark text-xs tracking-widest uppercase">
                Tickets
              </span>
            </div>
          ))
        )}
      </div>

      {shows?.length > 0 && (
        <div className="text-center mt-8">
          <Link href="/shows" className="text-tbh-dark text-xs tracking-widest uppercase hover:text-tbh-black transition-colors">
            All Shows →
          </Link>
        </div>
      )}
    </section>
  )
}
