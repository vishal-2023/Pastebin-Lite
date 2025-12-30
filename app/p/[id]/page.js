import { connectDB } from '../../../libs/mongodb'
import Paste from '@/models/Paste'
import { getNow } from '../../../libs/time'
import { notFound } from 'next/navigation'
import LinkExpired from '@/app/components/LinkExpired'

export default async function PastePage({ params }) {
    const { id } = await params
    await connectDB()
    const paste = await Paste.findById(id)
    if (!paste) return notFound()

    const now = getNow({ headers: new Headers() })

    if (
        (paste.expiresAt && now > paste.expiresAt) ||
        (paste.maxViews && paste.viewCount >= paste.maxViews)
    ) {
        return <LinkExpired/>
    }

    paste.viewCount += 1
    await paste.save()

    return (
        <div className="max-w-3xl mx-auto p-6">
            <pre className="whitespace-pre-wrap bg-gray-100 text-black p-4 rounded">
                {paste.content}
            </pre>
        </div>
    )
}
