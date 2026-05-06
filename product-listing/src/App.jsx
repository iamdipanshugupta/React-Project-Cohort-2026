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
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">🛍️ Products</h1>
        <p className="text-gray-500 mb-8">Page {page} of {totalPages}</p>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition">
                
                {/* Image */}
                <div className="bg-gray-100 p-4 flex items-center justify-center h-48">
                  <img
                    src={product.images}
                    alt={product.title}
                    className="h-full object-contain"
                  />
                </div>

                <div className="p-4 space-y-2">
                  {/* Title */}
                  <h2 className="font-semibold text-gray-900 text-sm line-clamp-2">{product.title}</h2>

                  {/* Category */}
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>

                  {/* Brand */}
                  {product.brand && (
                    <p className="text-gray-400 text-xs">Brand: {product.brand}</p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-gray-600 text-xs">{product.rating} / 5</span>
                  </div>

                  {/* Price + Discount */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-900 font-bold">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <p className={`text-xs ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                    {product.stock < 10 ? `Only ${product.stock} left!` : `In Stock: ${product.stock}`}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            ← Prev
          </button>
          <span className="text-gray-500">{page} / {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default App