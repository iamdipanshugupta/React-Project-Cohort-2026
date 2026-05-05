import { useEffect, useState } from "react"

function App() {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(false)

  async function randomCat() {
    setLoading(true)
    const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random")
    const data = await response.json()
    setCat(data?.data)  // ✅ data.data seedha cat object hai
    setLoading(false)
  }

  useEffect(() => {
    randomCat()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-fuchsia-950 to-pink-900 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center gap-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-xl md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pink-500/20 to-transparent blur-3xl" />
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-pink-100 shadow-sm shadow-pink-500/20">
              CAT BREED EXPLORER
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              🐈 Random Cat Viewer
            </h1>
            <p className="max-w-2xl text-slate-200/90 text-base sm:text-lg">
              Discover a new cat breed on every click. A sleek, soft card layout with gentle gradients, bright accent tags, and cozy typography.
            </p>
          </div>
        </div>

        {cat && (
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute -left-10 bottom-10 h-24 w-24 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="overflow-hidden rounded-t-[2rem] bg-slate-800">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full max-h-[32rem] object-contain bg-slate-950 transition duration-500 hover:scale-[1.02]"
              />
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-white">{cat.name}</h2>
                {cat.alt_names && (
                  <p className="text-sm uppercase tracking-widest text-pink-300/80">aka {cat.alt_names}</p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <span className="rounded-2xl bg-pink-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-pink-100 ring-1 ring-pink-300/20">
                  📍 {cat.origin}
                </span>
                <span className="rounded-2xl bg-violet-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100 ring-1 ring-violet-300/20">
                  ⏳ {cat.life_span} years
                </span>
                <span className="rounded-2xl bg-cyan-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 ring-1 ring-cyan-300/20">
                  ⚖️ {cat.weight?.metric} kg
                </span>
              </div>

              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-300 shadow-inner shadow-slate-950/30">
                <p className="text-sm leading-6">{cat.description}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-3xl bg-slate-800/90 p-4 text-center shadow shadow-slate-950/20">
                  <p className="text-xl font-semibold text-white">{cat.intelligence}/5</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Intelligence</p>
                </div>
                <div className="rounded-3xl bg-slate-800/90 p-4 text-center shadow shadow-slate-950/20">
                  <p className="text-xl font-semibold text-white">{cat.affection_level}/5</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Affection</p>
                </div>
                <div className="rounded-3xl bg-slate-800/90 p-4 text-center shadow shadow-slate-950/20">
                  <p className="text-xl font-semibold text-white">{cat.energy_level}/5</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Energy</p>
                </div>
              </div>

              {cat.wikipedia_url && (
                <a
                  href={cat.wikipedia_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400 sm:w-auto"
                >
                  📖 Learn more
                </a>
              )}
            </div>
          </div>
        )}

        <button
          onClick={randomCat}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 px-9 py-3 text-sm font-semibold text-white shadow-2xl shadow-pink-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-pink-400/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Next Cat 🐾"}
        </button>
      </div>
    </div>
  )
}

export default App