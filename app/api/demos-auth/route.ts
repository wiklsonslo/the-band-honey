import { NextResponse } from 'next/server'
import { getDemosPassword } from '@/sanity/queries'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  const correctPassword = await getDemosPassword()
  console.log('[demos-auth] fetched password:', JSON.stringify(correctPassword))
  console.log('[demos-auth] submitted password:', JSON.stringify(password))

  if (!correctPassword || password !== correctPassword) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('demos_auth', correctPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}
