'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/merch', label: 'Merch' },
  { href: '/shows', label: 'Shows' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tbh-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo pill */}
        <Link
          href="/"
          className="px-4 py-1.5 rounded-full bg-tbh-dark border border-tbh-brown text-tbh-cream font-display text-sm tracking-widest uppercase hover:bg-tbh-brown transition-colors"
        >
          TBH
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  pathname === href ? 'text-tbh-honey' : 'text-tbh-tan hover:text-tbh-cream'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-tbh-cream" />
          <span className="block w-5 h-0.5 bg-tbh-cream" />
          <span className="block w-5 h-0.5 bg-tbh-cream" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-tbh-black border-t border-tbh-dark">
          <ul className="flex flex-col py-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 text-sm tracking-widest uppercase transition-colors ${
                    pathname === href ? 'text-tbh-honey' : 'text-tbh-tan hover:text-tbh-cream'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
