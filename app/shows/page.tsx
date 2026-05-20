import Image from 'next/image'
import { getAllShows } from '@/sanity/queries'
import { ShowRow } from './ShowRow'

export const revalidate = 60

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
      <div className="bg-tbh-cream py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-3">
          {upcoming.length > 0 ? (
            upcoming.map((show) => <ShowRow key={show._id} show={show} />)
          ) : (
            <p className="text-center text-tbh-dark lowercase py-6">
              no upcoming shows — check back soon
            </p>
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
