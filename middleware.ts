import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/demos') && !pathname.startsWith('/demos/login')) {
    const cookie = request.cookies.get('demos_auth')

    if (!cookie?.value) {
      const loginUrl = new URL('/demos/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/demos/:path*'],
}
