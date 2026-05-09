import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, type SiteSettings } from '@/sanity/queries'

const jost = Jost({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'The Band Honey',
  description: 'The official website of The Band Honey',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings() ?? {} as SiteSettings

  return (
    <html lang="en" className={jost.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
