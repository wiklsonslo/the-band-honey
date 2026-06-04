import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, type SiteSettings } from '@/sanity/queries'
import { PostHogProvider } from '@/components/PostHogProvider'

const jost = Jost({ subsets: ['latin'], variable: '--font-dm-sans' })

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'The Band Honey',
  description: 'The Band Honey — indie/rock band from Athens, GA. Shows, music, and merch.',
  openGraph: {
    title: 'The Band Honey',
    description: 'The Band Honey — indie/rock band from Athens, GA. Shows, music, and merch.',
    images: ['/opengraph-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Band Honey',
    description: 'The Band Honey — indie/rock band from Athens, GA. Shows, music, and merch.',
    images: ['/opengraph-image.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings() ?? {} as SiteSettings

  return (
    <html lang="en" className={jost.variable}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        <PostHogProvider>
          <Nav />
          <main className="flex-1 pt-16">{children}</main>
          <Footer settings={settings} />
        </PostHogProvider>
      </body>
    </html>
  )
}
