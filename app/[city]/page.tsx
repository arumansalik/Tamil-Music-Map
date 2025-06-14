'use client'

import songsData from '@/data/songs.json'
import { useMusic } from '@/context/MusicPlayerContext'
import { Play, MapPin, Music2, CalendarDays } from 'lucide-react'

export default function CityPage({ params }: { params: { city: string } }) {
  const city = params.city.toLowerCase()
  const data = songsData[city]
  const { playSong, currentSong } = useMusic()

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-2xl">No music found for {city}</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black to-zinc-900 animate-fadeIn">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(/city-images/${city}.jpg)` }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-fadeIn"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
          <div className="bg-black/60 p-6 rounded-xl max-w-2xl animate-slideUp">
            <h1 className="text-4xl md:text-6xl font-extrabold capitalize mb-2">{city}</h1>
            <p className="text-gray-300 mb-4">Discover the rhythm and soul of {city} through its music, stories, and cultural beats.</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-200">
              <div className="flex items-center gap-1"><MapPin size={16} /> Popular City in Tamil Nadu</div>
              <div className="flex items-center gap-1"><Music2 size={16} /> {data.songs.length} Songs Available</div>
              <div className="flex items-center gap-1"><CalendarDays size={16} /> Updated Weekly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Music Content Layout */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Songs List */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">🎧 Songs</h2>
          <div className="space-y-4">
            {data.songs.map((song, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white/10 hover:bg-white/20 transition p-4 rounded-lg backdrop-blur-lg animate-fadeInUp"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={song.cover || '/covers/default.jpg'}
                    alt={song.title}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold">{song.title}</h3>
                    <p className="text-sm text-gray-300">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 hidden sm:block">{song.duration || '3:00'}</span>
                  <button
                    onClick={() => playSong(song)}
                    className="bg-white text-black rounded-full p-2 hover:scale-105"
                  >
                    <Play size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlists / Genres */}
        <div>
          <h2 className="text-xl font-bold mb-4">🎵 City Vibes</h2>
          <div className="grid grid-cols-2 gap-4">
            {(data.playlists || []).map((playlist, idx) => (
              <div
                key={idx}
                className="bg-white/10 hover:bg-white/20 transition p-3 rounded-xl backdrop-blur-md animate-fadeIn hover:scale-[1.03]"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2">
                  <img
                    src={playlist.cover || '/covers/default-playlist.jpg'}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-sm text-white truncate">{playlist.name}</h4>
                <p className="text-xs text-gray-300 line-clamp-2">{playlist.description}</p>
              </div>
            ))}
            {(!data.playlists || data.playlists.length === 0) && (
              <p className="text-sm text-gray-400">No curated playlists available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
