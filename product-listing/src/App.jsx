import { useEffect, useState } from "react"

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  async function fetchProducts(pageNum) {
    setLoading(true)
    const response = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNum}&limit=12`)
    const data = await response.json()
    setProducts(data?.data?.data ?? [])
    setTotalPages(data?.data?.totalPages ?? 1)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-amber-400/80 mb-3">Curated Collection</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            🛍️ Premium Products
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300">
            Discover our exclusive selection of high-quality products with amazing discounts
          </p>
          <p className="mt-4 text-sm text-slate-400 font-medium">
            Page <span className="text-amber-400 font-bold">{page}</span> of <span className="text-amber-400 font-bold">{totalPages}</span>
          </p>
        </div>

        {loading ? (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
            </div>
            <p className="mt-4 text-slate-300 text-lg">Loading premium products...</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-500/20 hover:shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 flex items-center justify-center h-56 overflow-hidden">
                  <img
                    src={`https://dummyjson.com/products/${product.id}/thumbnail`}
                    alt={product.title}
                    className="h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://placehold.co/200x200/gray/white?text=${product.title.charAt(0)}`
                    }}
                  />
                  {product.discountPercentage && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <h2 className="font-bold text-white text-sm line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {product.title}
                  </h2>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-500/30 font-medium">
                      {product.category}
                    </span>
                  </div>

                  {/* Brand + Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    {product.brand && <span className="font-medium text-slate-200">{product.brand}</span>}
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="font-semibold">{product.rating}/5</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>

                  {/* Price Section */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xl font-bold text-white">${product.price}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock < 10
                      ? "bg-red-500/20 text-red-300"
                      : "bg-green-500/20 text-green-300"
                      }`}>
                      {product.stock < 10 ? `${product.stock} left` : "In Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
          >
            ← Prev
          </button>
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-sm">Page</span>
            <span className="text-xl font-bold text-amber-400">{page}</span>
            <span className="text-slate-300 text-sm">of</span>
            <span className="text-xl font-bold text-amber-400">{totalPages}</span>
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default App