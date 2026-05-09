import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const validTags = ['siteSettings', 'show', 'release', 'track', 'demo', 'member', 'aboutPage', 'merchItem']

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const { body, isValidSignature } = await parseBody<{ _type: string }>(request, secret)

  if (!isValidSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  if (!body?._type) {
    return NextResponse.json({ error: 'Missing _type in body' }, { status: 400 })
  }

  const tag = body._type
  if (validTags.includes(tag)) {
    revalidateTag(tag)
    if (tag === 'siteSettings') revalidateTag('siteSettings')
  }

  return NextResponse.json({ revalidated: true, tag })
}
