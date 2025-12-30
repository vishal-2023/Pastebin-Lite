import { NextResponse } from 'next/server'
import Paste from '@/models/Paste'
import { getNow } from '../../../../libs/time'
import { connectDB } from '@/libs/mongodb'

export async function GET(req, { params }) {
  await connectDB()

  const paste = await Paste.findById(params.id)
  if (!paste) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const now = getNow(req)

  if (paste.expiresAt && now > paste.expiresAt) {
    return NextResponse.json({ error: 'Expired' }, { status: 404 })
  }

  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return NextResponse.json({ error: 'View limit exceeded' }, { status: 404 })
  }

  paste.viewCount += 1
  await paste.save()

  return NextResponse.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - paste.viewCount
      : null,
    expires_at: paste.expiresAt
  })
}
