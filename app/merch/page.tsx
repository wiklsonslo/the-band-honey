import { getAllMerch } from '@/sanity/queries'
import { MerchItem } from './MerchItem'

export const revalidate = 60

const FALLBACK_MERCH = [
  { _id: 'f1', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 1 },
  { _id: 'f2', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 2 },
  { _id: 'f3', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 3 },
  { _id: 'f4', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 4 },
  { _id: 'f5', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 5 },
  { _id: 'f6', title: 'Merch', image: { asset: { url: '/images/tongue-tied.png' } }, squareUrl: '#', isAvailable: true, order: 6 },
]

export default async function MerchPage() {
  const items = await getAllMerch()
  const display = items.length ? items : FALLBACK_MERCH

  return (
    <div className="bg-tbh-cream min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl text-tbh-black uppercase mb-10">Merch</h1>

        <div className="grid grid-cols-3 gap-5">
          {display.map((item) => (
            <MerchItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
