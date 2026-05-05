import  { useEffect, useState } from 'react'

const App = () => {

  const [users,setUsers] = useState([])

  useEffect( () => {
    async function randomUsers() {
      const response = await fetch ("https://api.freeapi.app/api/v1/public/randomusers")
      const data = await response.json()
      setUsers(data?.data?.data ?? [])
    }

    randomUsers()

  },[])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-300/80 mb-3">Live random profiles</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Random Users
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300">
            Fetching a fresh set of user profiles from the public API, styled with Tailwind for a polished card grid.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {users.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
              Loading users...
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.login.uuid}
                className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-slate-950/40"
              >
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-28 h-28 mx-auto rounded-full border-4 border-sky-400/20 shadow-lg shadow-sky-500/20 object-cover"
                />
                <h2 className="mt-5 text-xl font-semibold text-white">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="mt-2 text-sm text-slate-300 break-words">{user.email}</p>
                <div className="mt-5 space-y-2 text-sm text-slate-400">
                  <p>{user.location.city}, {user.location.country}</p>
                  <p>{user.phone}</p>
                </div>
                <span className="inline-flex mt-4 rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-300">
                  {user.nat}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
