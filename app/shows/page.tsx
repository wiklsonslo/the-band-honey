import Image from 'next/image'
import { getAllShows } from '@/sanity/queries'
import type { Show } from '@/sanity/queries'

export const revalidate = 60

function ShowRow({ show }: { show: Show }) {
  const date = new Date(show.date)
  return (
    <div className="flex items-center justify-between bg-tbh-tan/40 rounded-full px-8 py-5 gap-4">
      <div className="flex items-baseline gap-4 min-w-0">
        <span className="font-display text-tbh-black text-lg uppercase shrink-0">
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-tbh-dark text-sm tracking-widest uppercase truncate">
          {show.venue}{show.city ? `, ${show.city}` : ''}
        </span>
      </div>

      {show.soldOut ? (
        <span className="text-tbh-dark text-xs tracking-widest uppercase shrink-0">Sold Out</span>
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
}

export default async function ShowsPage() {
  const shows = await getAllShows()
  const now = new Date()
  const upcoming = shows.filter((s) => new Date(s.date) >= now)
  const past = shows.filter((s) => new Date(s.date) < now)

  return (
    <>
      {/* Hero image with SHOWS title */}
      <div className="relative h-72 md:h-[50vh] w-full flex items-end">
        <Image
          src="/images/jaminthestreets5.jpg"
          alt="Shows"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-tbh-black/40" />
        <h1 className="relative z-10 font-display text-6xl md:text-8xl text-tbh-cream uppercase px-8 pb-8">
          Shows
        </h1>
      </div>

      {/* Show list */}
      <div className="bg-tbh-cream min-h-screen py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-3">
          {upcoming.length > 0 ? (
            upcoming.map((show) => <ShowRow key={show._id} show={show} />)
          ) : (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-tbh-tan/40 rounded-full px-8 py-5 gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-tbh-black text-lg uppercase">Date</span>
                  <span className="text-tbh-dark text-sm tracking-widest uppercase">Location</span>
                </div>
                <span className="px-5 py-1.5 rounded-full bg-tbh-brown/40 text-tbh-dark text-xs tracking-widest uppercase">Tickets</span>
              </div>
            ))
          )}

          {past.length > 0 && (
            <div className="pt-10">
              <p className="font-display text-tbh-brown text-xs tracking-widest uppercase mb-4">Past Shows</p>
              <div className="space-y-3 opacity-50">
                {past.reverse().map((show) => <ShowRow key={show._id} show={show} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
