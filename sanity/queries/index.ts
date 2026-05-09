import { client } from '../client'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SocialLinks = {
  spotify?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  facebook?: string
  appleMusic?: string
}

export type SiteSettings = {
  bandName: string
  bookingEmail: string
  contactEmail: string
  socialLinks: SocialLinks
  footerText: string
}

export type Show = {
  _id: string
  venue: string
  city: string
  date: string
  ticketUrl?: string
  isFeatured: boolean
  soldOut: boolean
}

export type Release = {
  _id: string
  title: string
  type: 'single' | 'ep' | 'album'
  releaseDate: string
  artwork?: { asset: { url: string } }
  youtubeUrl?: string
  spotifyUrl?: string
  isFeatured: boolean
}

export type Track = {
  _id: string
  title: string
  release?: { title: string }
  spotifyEmbedUrl: string
  order: number
}

export type Demo = {
  _id: string
  title: string
  description?: string
  spotifyEmbedUrl?: string
  order: number
}

export type Member = {
  _id: string
  name: string
  role: string
  photo?: { asset: { url: string } }
  order: number
}

export type AboutPage = {
  bio: unknown[]
  bandPhoto?: { asset: { url: string } }
}

export type MerchItem = {
  _id: string
  title: string
  image: { asset: { url: string } }
  squareUrl: string
  isAvailable: boolean
  order: number
}

// ─── Queries ──────────────────────────────────────────────────────────────────

const IMAGE_FIELDS = `"url": asset->url`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function q<T>(query: string, tags: string[], fallback: T): Promise<T> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (client.fetch as any)(query, {}, { next: { tags } })
    return (result ?? fallback) as T
  } catch {
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return q(
    `*[_type == "siteSettings"][0]{ bandName, bookingEmail, contactEmail, socialLinks, footerText }`,
    ['siteSettings'],
    null
  )
}

export async function getFeaturedShows(): Promise<Show[]> {
  return q(
    `*[_type == "show" && isFeatured == true && date >= now()] | order(date asc)[0...4]{
      _id, venue, city, date, ticketUrl, isFeatured, soldOut
    }`,
    ['show'],
    []
  )
}

export async function getAllShows(): Promise<Show[]> {
  return q(
    `*[_type == "show"] | order(date asc){ _id, venue, city, date, ticketUrl, isFeatured, soldOut }`,
    ['show'],
    []
  )
}

export async function getFeaturedReleases(): Promise<Release[]> {
  return q(
    `*[_type == "release" && isFeatured == true] | order(releaseDate desc)[0...4]{
      _id, title, type, releaseDate, artwork{ ${IMAGE_FIELDS} }, youtubeUrl, spotifyUrl, isFeatured
    }`,
    ['release'],
    []
  )
}

export async function getAllTracks(): Promise<Track[]> {
  return q(
    `*[_type == "track"] | order(order asc){ _id, title, release->{ title }, spotifyEmbedUrl, order }`,
    ['track'],
    []
  )
}

export async function getAllDemos(): Promise<Demo[]> {
  return q(
    `*[_type == "demo"] | order(order asc){ _id, title, description, spotifyEmbedUrl, order }`,
    ['demo'],
    []
  )
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return q(
    `*[_type == "aboutPage"][0]{ bio, bandPhoto{ ${IMAGE_FIELDS} } }`,
    ['aboutPage'],
    null
  )
}

export async function getAllMembers(): Promise<Member[]> {
  return q(
    `*[_type == "member"] | order(order asc){ _id, name, role, photo{ ${IMAGE_FIELDS} }, order }`,
    ['member'],
    []
  )
}

export async function getAllMerch(): Promise<MerchItem[]> {
  return q(
    `*[_type == "merchItem" && isAvailable == true] | order(order asc){
      _id, title, image{ ${IMAGE_FIELDS} }, squareUrl, isAvailable, order
    }`,
    ['merchItem'],
    []
  )
}

export async function getDemosPassword(): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (client.fetch as any)(
      `*[_type == "siteSettings"][0].demosPassword`,
      {},
      { cache: 'no-store' }
    )
    return (result as string) ?? ''
  } catch {
    return ''
  }
}
