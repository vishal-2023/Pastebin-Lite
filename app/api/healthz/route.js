import { connectDB } from '@/libs/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
