import { useEffect, useState } from "react"

function App() {
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  async function fetchVideos(pageNum) {
    setLoading(true)
    const response = await fetch(`https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNum}&limit=12`)
    const data = await response.json()
    setVideos(data?.data?.data ?? [])
    setTotalPages(data?.data?.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos(page)
  }, [page])

  function formatViews(num) {
    if (!num) return "0"
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num
  }

  function formatDuration(iso) {
    if (!iso) return ""
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    const h = match[1] ? match[1] + ":" : ""
    const m = (match[2] ?? "0").padStart(h ? 2 : 1, "0") + ":"
    const s = (match[3] ?? "0").padStart(2, "0")
    return h + m + s
  }

  function formatDate(dateStr) {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg shadow-red-600/50">
              <span className="text-white text-2xl">▶</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-red-400/80">Video Library</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                YouTube Videos
              </h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm sm:text-base ml-16">
            Curated collection by Hitesh Choudhary • <span className="text-red-400 font-bold">Page {page}</span> of <span className="text-red-400 font-bold">{totalPages}</span>
          </p>
        </div>

        {loading ? (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
            <p className="mt-4 text-slate-300 text-lg">Loading incredible videos...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((v) => {
              const video = v.items
              const snippet = video?.snippet
              const stats = video?.statistics
              const duration = video?.contentDetails?.duration
              const thumbnail = snippet?.thumbnails?.high?.url
              const videoId = video?.id

              return (
                <a
                  key={videoId}
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-red-600/20 hover:shadow-2xl"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-slate-800">
                    <img
                      src={thumbnail}
                      alt={snippet?.title}
                      className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Duration badge */}
                    <span className="absolute bottom-3 right-3 bg-black/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                      ⏱ {formatDuration(duration)}
                    </span>
                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <span className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-red-600/50 transform group-hover:scale-110 transition-transform">▶</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <h2 className="text-sm font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors">
                      {snippet?.title}
                    </h2>
                    
                    <p className="text-xs text-slate-300 font-medium">{snippet?.channelTitle}</p>
                    
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/50 rounded-lg p-2">
                      <span className="flex items-center gap-1">👁 <span className="font-semibold text-slate-200">{formatViews(stats?.viewCount)}</span></span>
                      <span className="flex items-center gap-1">👍 <span className="font-semibold text-slate-200">{formatViews(stats?.likeCount)}</span></span>
                      <span className="flex items-center gap-1">💬 <span className="font-semibold text-slate-200">{stats?.commentCount}</span></span>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-slate-400">📅 {formatDate(snippet?.publishedAt)}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {snippet?.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-block bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 text-xs px-2.5 py-1 rounded-full border border-red-500/30 font-medium">
                          #{tag.slice(0, 12)}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg border border-white/10 hover:border-white/20"
          >
            ← Prev
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-white/10">
            <span className="text-slate-300 text-sm">Page</span>
            <span className="text-lg font-bold text-red-400">{page}</span>
            <span className="text-slate-300 text-sm">of</span>
            <span className="text-lg font-bold text-red-400">{totalPages}</span>
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default App