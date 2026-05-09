import { getAllTracks } from '@/sanity/queries'
import type { Track } from '@/sanity/queries'

export const revalidate = 60

function SpotifyEmbed({ track }: { track: Track }) {
  return (
    <div className="py-4 border-b border-tbh-dark last:border-0">
      <p className="font-display text-tbh-cream mb-3">{track.title}</p>
      {track.release && (
        <p className="text-tbh-tan text-xs tracking-widest uppercase mb-3">
          {track.release.title}
        </p>
      )}
      <iframe
        src={track.spotifyEmbedUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded"
      />
    </div>
  )
}

export default async function MusicPage() {
  const tracks = await getAllTracks()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-display text-5xl md:text-7xl text-tbh-cream uppercase mb-16">Music</h1>

      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track) => (
            <li key={track._id}>
              <SpotifyEmbed track={track} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-tbh-tan">Music coming soon.</p>
      )}
    </div>
  )
}
