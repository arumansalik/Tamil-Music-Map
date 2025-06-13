'use client'

export default function Navbar() {
  return (
    <div className="w-full flex justify-center fixed top-6 z-50">
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-10 py-3 shadow-xl flex items-center justify-between gap-10 text-white">
        <h1 className="text-lg font-semibold tracking-wide drop-shadow">
          Tamil Music Map 🎧
        </h1>
        <ul className="flex gap-6 font-medium text-sm">
          <li>
            <a
              href="/"
              className="hover:text-pink-400 hover:underline underline-offset-4 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/explore"
              className="hover:text-pink-400 hover:underline underline-offset-4 transition"
            >
              Explore
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
