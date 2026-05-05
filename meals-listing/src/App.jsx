import { useEffect, useState } from "react"


function App() {

  const [meals, setMeals] = useState([])

  useEffect(()=>{
    async function mealsListings(){
      const response = await fetch("https://api.freeapi.app/api/v1/public/meals")
      const data = await response.json()
      setMeals(data?.data?.data ?? [])
    }

    mealsListings()
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100 text-slate-900 p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-[2rem] border border-pink-200/80 bg-white/80 p-6 shadow-lg shadow-pink-200/40 backdrop-blur-md">
          <p className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700 shadow-sm ring-1 ring-pink-200">
            Fresh meals from the API
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Meals Listings
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            Explore tasty meals with clean cards, responsive layout, and a polished Tailwind-only design.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meals.map((meal) => (
            <article
              key={meal.idMeal}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="space-y-3 p-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {meal.strMeal}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {meal.strCategory} • {meal.strArea}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                    {meal.strCategory}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
                    {meal.strArea}
                  </span>
                  <p className="text-xs text-gray-400">🏷️ {meal.strTags}</p>
                   <p className="text-sm text-gray-500 line-clamp-3">{meal.strInstructions}</p>
                   <a href={meal.strYoutube} target="_blank" className="text-red-500 text-sm font-medium hover:underline">
                  ▶ Watch Recipe
                </a>
                 <a href={meal.strSource} target="_blank" className="block text-blue-500 text-sm hover:underline">
                  📄 Full Recipe
                </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App