'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import type { Release } from '@/sanity/queries'

type Props = { releases: Release[] }

function getEmbedUrl(youtubeUrl: string): string | null {
  const match = youtubeUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match?.[1]) return null
  return `https://www.youtube.com/embed/${match[1]}`
}

export function NewReleases({ releases }: Props) {
  const items = releases?.filter((r) => r.youtubeUrl).slice(0, 2)

  if (!items?.length) return null

  return (
    <section className="bg-tbh-cream py-16 px-6">
      <h2 className="font-display text-2xl text-tbh-black text-center tracking-widest uppercase mb-10">
        New Releases
      </h2>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((release) => {
          const embedUrl = getEmbedUrl(release.youtubeUrl!)
          return (
            <article key={release._id}>
              <p className="font-display text-tbh-black text-lg uppercase mb-3">{release.title}</p>
              {embedUrl && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-tbh-tan">
                  <iframe
                    src={embedUrl}
                    title={release.title}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/music"
          onClick={() => posthog.capture('all_music_link_clicked')}
          className="text-tbh-dark text-xs lowercase hover:text-tbh-black transition-colors"
        >
          All Music →
        </Link>
      </div>
    </section>
  )
}
