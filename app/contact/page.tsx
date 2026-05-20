import Image from 'next/image'
import { getSiteSettings } from '@/sanity/queries'

export const revalidate = 60

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const email = settings?.contactEmail ?? settings?.bookingEmail ?? 'info@thebandhoney.com'

  return (
    <>
      <div className="relative h-64 md:h-[50vh] w-full">
        <Image
          src="/images/couchpic.jpg"
          alt="Contact"
          fill
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-tbh-black/40" />
      </div>

      <div className="bg-tbh-cream px-6 py-16">
        <div className="max-w-4xl mx-auto flex items-start justify-between gap-12">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-tbh-black uppercase mb-4">Contact</h1>
            <p className="text-tbh-dark lowercase max-w-sm leading-relaxed">
              for booking inquiries, press, and general correspondence, please don't hesitate to get in touch.
            </p>
          </div>

          <div className="shrink-0 pt-2">
            <a
              href={`mailto:${email}`}
              className="inline-block px-6 py-2.5 rounded-full bg-tbh-brown text-tbh-cream text-sm hover:bg-tbh-rust transition-colors lowercase"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
