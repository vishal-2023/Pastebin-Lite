export default function LinkExpired() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Link Expired</h1>
      <p className="text-gray-700 mb-6">
        The paste you are trying to view is no longer available.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create a New Paste
      </a>
    </div>
  )
}
