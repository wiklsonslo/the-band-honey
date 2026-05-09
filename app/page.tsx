import Image from 'next/image'
import { getSiteSettings, getFeaturedShows, getFeaturedReleases } from '@/sanity/queries'
import { Hero } from '@/components/home/Hero'
import { UpcomingShows } from '@/components/home/UpcomingShows'
import { NewReleases } from '@/components/home/NewReleases'

export const revalidate = 60

export default async function Home() {
  const [settings, shows, releases] = await Promise.all([
    getSiteSettings().then((s) => s ?? undefined),
    getFeaturedShows(),
    getFeaturedReleases(),
  ])

  return (
    <>
      <Hero settings={settings} />
      <UpcomingShows shows={shows} />

      {/* Mid-page full-width band photo */}
      <div className="relative h-72 md:h-96 w-full">
        <Image
          src="/images/stairpic.jpg"
          alt="The Band Honey"
          fill
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-tbh-black/20" />
      </div>

      <NewReleases releases={releases} />
    </>
  )
}
