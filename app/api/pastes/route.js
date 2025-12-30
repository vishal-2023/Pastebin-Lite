import { NextResponse } from 'next/server'
import Paste from '@/models/Paste'
import { connectDB } from '../../../libs/mongodb'

export async function POST(req) {
  const body = await req.json()
  const { content, ttl_seconds, max_views } = body

  if (!content || typeof content !== 'string' || !content.trim()) {
    return NextResponse.json(
      { error: 'Invalid content' },
      { status: 400 }
    )
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return NextResponse.json({ error: 'Invalid ttl_seconds' }, { status: 400 })
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return NextResponse.json({ error: 'Invalid max_views' }, { status: 400 })
  }

  await connectDB()

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views || null
  })

  return NextResponse.json({
    id: paste._id.toString(),
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste._id}`
  })
}
