'use client'

import Image from 'next/image'
import posthog from 'posthog-js'

import type { MerchItem as SanityMerchItem } from '@/sanity/queries'

export function MerchItem({ item }: { item: SanityMerchItem }) {
  return (
    <a
      href={item.squareUrl !== '#' ? item.squareUrl : undefined}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        posthog.capture('merch_item_clicked', {
          item_title: item.title,
          item_id: item._id,
          is_available: item.isAvailable,
          square_url: item.squareUrl !== '#' ? item.squareUrl : null,
        })
      }
      className="group block"
    >
      <div className="aspect-square overflow-hidden rounded-2xl bg-tbh-tan relative">
        <Image
          src={item.image.asset.url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <p className="font-display text-tbh-black uppercase text-sm mt-2 tracking-wide">
        {item.title}
      </p>
    </a>
  )
}
