import Image from 'next/image'
import { getAboutPage, getAllMembers } from '@/sanity/queries'
import type { Member } from '@/sanity/queries'

export const revalidate = 60

const FALLBACK_MEMBERS: Member[] = [
  { _id: 'm1', name: 'Name', role: 'Bio', photo: { asset: { url: '/images/basspic.jpg' } }, order: 1 },
  { _id: 'm2', name: 'Name', role: 'Bio', photo: { asset: { url: '/images/drumpic.jpg' } }, order: 2 },
  { _id: 'm3', name: 'Name', role: 'Bio', photo: { asset: { url: '/images/couchpic.jpg' } }, order: 3 },
  { _id: 'm4', name: 'Name', role: 'Bio', photo: { asset: { url: '/images/stairpic.jpg' } }, order: 4 },
]

export default async function AboutPage() {
  const [about, members] = await Promise.all([getAboutPage(), getAllMembers()])
  const displayMembers = members.length ? members : FALLBACK_MEMBERS
  const bandPhotoUrl = about?.bandPhoto?.asset?.url ?? '/images/stagepic.jpg'

  return (
    <div className="bg-tbh-cream min-h-screen pt-14">

      {/* Top: title + bio LEFT, band photo RIGHT */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-start">
        <div className="pt-4">
          <h1 className="font-display text-5xl md:text-6xl text-tbh-black uppercase mb-3">
            The Band Honey
          </h1>
          <p className="font-display text-tbh-dark text-sm tracking-widest uppercase mb-4">Bio</p>
          {about?.bio ? (
            <div className="space-y-3">
              {(about.bio as Array<{ _key: string; children?: Array<{ text: string }> }>).map((block) => (
                <p key={block._key} className="text-tbh-dark leading-relaxed">
                  {block.children?.map((c) => c.text).join('')}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-tbh-dark leading-relaxed">Bio coming soon.</p>
          )}
        </div>

        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image src={bandPhotoUrl} alt="The Band Honey" fill className="object-cover" />
        </div>
      </div>

      {/* Members: alternating layout */}
      <div className="max-w-5xl mx-auto px-6 pb-16 space-y-0">
        {displayMembers.map((member, i) => {
          const isEven = i % 2 === 0
          const photoUrl = member.photo?.asset?.url ?? '/images/stagepic.jpg'

          return (
            <div key={member._id} className="py-8 border-t border-tbh-tan">
              {isEven ? (
                /* Photo LEFT, name RIGHT */
                <div className="flex items-center gap-8">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden shrink-0">
                    <Image src={photoUrl} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-tbh-black text-3xl uppercase">{member.name}</p>
                    <p className="text-tbh-dark text-sm lowercase mt-1">{member.role}</p>
                  </div>
                </div>
              ) : (
                /* Name LEFT, photo RIGHT */
                <div className="flex items-center justify-between gap-8">
                  <div>
                    <p className="font-display text-tbh-black text-3xl uppercase">{member.name}</p>
                    <p className="text-tbh-dark text-sm lowercase mt-1">{member.role}</p>
                  </div>
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden shrink-0">
                    <Image src={photoUrl} alt={member.name} fill className="object-cover" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
