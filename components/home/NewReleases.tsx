import Link from 'next/link'
import Image from 'next/image'
import type { Release } from '@/sanity/queries'

type Props = { releases: Release[] }

function getThumbUrl(release: Release): string {
  if (release.youtubeUrl) {
    const match = release.youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (match?.[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
  }
  if (release.artwork?.asset?.url) return release.artwork.asset.url
  return '/images/tongue-tied.png'
}

const FALLBACK: Release[] = [
  { _id: 'f1', title: 'Tongue Tied', type: 'single', releaseDate: '2024-01-01', isFeatured: true },
  { _id: 'f2', title: 'Tongue Tied', type: 'single', releaseDate: '2024-01-01', isFeatured: true },
]

export function NewReleases({ releases }: Props) {
  const items = releases?.length ? releases.slice(0, 2) : FALLBACK

  return (
    <section className="bg-tbh-cream py-16 px-6">
      <h2 className="font-display text-2xl text-tbh-black text-center tracking-widest uppercase mb-10">
        New Releases
      </h2>

      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8">
        {items.map((release) => (
          <article key={release._id}>
            <p className="font-display text-tbh-black text-lg uppercase mb-3">{release.title}</p>
            <a
              href={release.youtubeUrl ?? '#'}
              target={release.youtubeUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-tbh-tan relative">
                <Image
                  src={getThumbUrl(release)}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/music" className="text-tbh-dark text-xs tracking-widest uppercase hover:text-tbh-black transition-colors">
          All Music →
        </Link>
      </div>
    </section>
  )
}
