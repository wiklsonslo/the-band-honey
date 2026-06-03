import { getAllDemos } from '@/sanity/queries'
import type { Demo } from '@/sanity/queries'

export const revalidate = 60

function DemoRow({ demo }: { demo: Demo }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-tbh-dark last:border-0 gap-4">
      <div className="min-w-0">
        <p className="font-display text-tbh-cream text-lg">{demo.title}</p>
        {demo.description && (
          <p className="text-tbh-tan text-sm lowercase mt-1">{demo.description}</p>
        )}
      </div>
      {demo.url && (
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-2 rounded-full border border-tbh-tan text-tbh-tan text-xs tracking-widest uppercase hover:border-tbh-cream hover:text-tbh-cream transition-colors"
        >
          Listen
        </a>
      )}
    </div>
  )
}

export default async function DemosPage() {
  const demos = await getAllDemos()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-tbh-rust text-tbh-cream text-xs tracking-widest uppercase mb-4">
          Private
        </span>
        <h1 className="font-display text-5xl md:text-7xl text-tbh-cream uppercase">Demos</h1>
        <p className="text-tbh-tan lowercase mt-4 text-sm">
          these recordings are confidential. please do not share or distribute.
        </p>
      </div>

      {demos.length > 0 ? (
        <ul>
          {demos.map((demo) => (
            <li key={demo._id}>
              <DemoRow demo={demo} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-tbh-tan lowercase">demos coming soon.</p>
      )}
    </div>
  )
}
