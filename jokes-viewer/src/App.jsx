import { useEffect, useState } from "react"

function App() {
  const [jokes, setJokes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  async function fetchJokes(pageNum) {
    setLoading(true)
    const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?page=${pageNum}&limit=10`)
    const data = await response.json()
    setJokes(data?.data?.data ?? [])
    setTotalPages(data?.data?.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchJokes(page)
  }, [page])

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-2">😂 Jokes Viewer</h1>
      <p className="text-center text-gray-500 mb-8">Page {page} of {totalPages}</p>

      {loading ? (
        <p className="text-center text-gray-400">Loading jokes...</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {jokes.map((joke) => (
            <div key={joke.id} className="bg-white border border-yellow-200 rounded-2xl p-5 shadow-sm">
              <p className="text-gray-800 text-base">{joke.content}</p>
              {joke.categories.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {joke.categories.map((cat) => (
                    <span key={cat} className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-full transition"
        >
          ← Prev
        </button>
        <span className="text-gray-600">{page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-full transition"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default App