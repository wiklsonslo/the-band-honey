import Image from 'next/image'
import Link from 'next/link'
import type { SiteSettings } from '@/sanity/queries'

type Props = { settings?: SiteSettings }

export function Hero({ settings }: Props) {
  const bookingEmail = settings?.bookingEmail

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="/images/stagepic.jpg"
        alt="The Band Honey"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-tbh-black/50" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] leading-none tracking-tight text-tbh-cream uppercase">
          The Band Honey
        </h1>

        <div className="flex gap-4 mt-2">
          <Link
            href="/shows"
            className="px-8 py-2.5 rounded-full border border-tbh-cream text-tbh-cream text-sm tracking-widest uppercase hover:bg-tbh-cream hover:text-tbh-black transition-colors font-display"
          >
            Shows
          </Link>
          <a
            href={bookingEmail ? `mailto:${bookingEmail}` : '/contact'}
            className="px-8 py-2.5 rounded-full border border-tbh-cream text-tbh-cream text-sm tracking-widest uppercase hover:bg-tbh-cream hover:text-tbh-black transition-colors font-display"
          >
            Book
          </a>
        </div>
      </div>
    </section>
  )
}
