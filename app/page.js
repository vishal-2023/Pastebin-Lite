'use client'
import { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'

export default function Home() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [views, setViews] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: views ? Number(views) : undefined
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setUrl('')
      } else {
        setUrl(data.url)
        setContent('')
        setTtl('')
        setViews('')
      }
    } catch (err) {
      setError('Network error')
      setUrl('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create a New Paste
        </h1>

        <label className="block mb-2 text-gray-700 font-medium">
          Paste Content
        </label>
        <textarea
          className="w-full border text-gray-700 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
          rows="6"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter your text here..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              TTL (seconds, optional)
            </label>
            <input
              type="number"
              className="w-full text-black border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={ttl}
              onChange={e => setTtl(e.target.value)}
              placeholder="e.g. 60"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Max Views (optional)
            </label>
            <input
              type="number"
              className="w-full border text-black border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={views}
              onChange={e => setViews(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <button
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600'
            }`}
          onClick={submit}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Paste'}
        </button>

        {url && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Your paste is ready:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={url}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url)
                  toast.success("Link copied successfully..")
                }}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-400 transition"
              >
                Copy
              </button>
            </div>
          </div>

        )}
      </div>
      <Toaster />
    </div>
  )
}
