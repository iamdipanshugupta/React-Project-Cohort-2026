import { useEffect, useState } from "react"

function App() {
  const [quotes, setQuotes] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  async function fetchQuotes(pageNum) {
    setLoading(true)
    const response = await fetch(`https://api.freeapi.app/api/v1/public/quotes?page=${pageNum}&limit=10`)
    const data = await response.json()
    setQuotes(data?.data?.data ?? [])
    setTotalPages(data?.data?.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchQuotes(page)
  }, [page])

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <h1 className="text-4xl font-bold text-center text-white mb-2">💬 Quotes</h1>
      <p className="text-center text-slate-500 mb-8">Page {page} of {totalPages}</p>

      {loading ? (
        <p className="text-center text-slate-400">Loading quotes...</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              
              {/* Quote */}
              <p className="text-white text-lg leading-relaxed">"{quote.content}"</p>
              
              {/* Author */}
              <p className="text-slate-400 text-sm mt-3">— {quote.author}</p>

              {/* Tags */}
              {quote.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {quote.tags.map((tag) => (
                    <span key={tag} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Date */}
              <p className="text-slate-600 text-xs mt-3">Added: {quote.dateAdded}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-white hover:bg-gray-100 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-full transition"
        >
          ← Prev
        </button>
        <span className="text-slate-400">{page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-white hover:bg-gray-100 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-full transition"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default App