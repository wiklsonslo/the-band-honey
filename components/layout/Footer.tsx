import type { SiteSettings } from '@/sanity/queries'

type Props = { settings: SiteSettings }

export function Footer({ settings }: Props) {
  const email = settings?.bookingEmail ?? 'email@email.com'

  const socials = [
    { label: 'Apple Music', url: settings?.socialLinks?.appleMusic },
    { label: 'Spotify', url: settings?.socialLinks?.spotify },
    { label: 'YouTube', url: settings?.socialLinks?.youtube },
  ]

  return (
    <footer className="bg-tbh-dark mt-0">
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between gap-6">
        {/* Left: Book Us + email pill */}
        <div>
          <p className="font-display text-tbh-cream text-xl uppercase tracking-wide mb-3">
            Book Us
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-block px-5 py-2 rounded-full bg-tbh-brown/60 text-tbh-cream text-sm hover:bg-tbh-honey hover:text-tbh-black transition-colors"
          >
            {email}
          </a>
        </div>

        {/* Right: Social links with circle icons */}
        <ul className="flex flex-col gap-2 items-end">
          {socials.map(({ label, url }) => (
            <li key={label} className="flex items-center gap-2">
              <a
                href={url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tbh-tan hover:text-tbh-cream text-xs tracking-widest uppercase transition-colors"
              >
                {label}
              </a>
              <span className="w-4 h-4 rounded-full bg-tbh-brown flex-shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
