import { getAllDemos } from '@/sanity/queries'
import type { Demo } from '@/sanity/queries'

export const revalidate = 60

function DemoEmbed({ demo }: { demo: Demo }) {
  return (
    <div className="py-5 border-b border-tbh-dark last:border-0">
      <p className="font-display text-tbh-cream text-lg mb-1">{demo.title}</p>
      {demo.description && (
        <p className="text-tbh-tan text-sm mb-3">{demo.description}</p>
      )}
      {demo.spotifyEmbedUrl && (
        <iframe
          src={demo.spotifyEmbedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded"
        />
      )}
    </div>
  )
}

export default async function DemosPage() {
  const demos = await getAllDemos()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 bg-tbh-rust text-tbh-cream text-xs tracking-widest uppercase mb-4">
          Private
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-tbh-cream uppercase">Demos</h1>
        <p className="text-tbh-tan mt-4 text-sm">
          These recordings are confidential. Please do not share or distribute.
        </p>
      </div>

      {demos.length > 0 ? (
        <ul>
          {demos.map((demo) => (
            <li key={demo._id}>
              <DemoEmbed demo={demo} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-tbh-tan">Demos coming soon.</p>
      )}
    </div>
  )
}
