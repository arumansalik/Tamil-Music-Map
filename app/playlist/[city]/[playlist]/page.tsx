'use client'

import songsData from '@/data/songs.json'
import { useMusic } from '@/context/MusicPlayerContext'
import { Play } from 'lucide-react'
import { notFound } from 'next/navigation'

type PlaylistPageProps = {
  params: {
    city: string
    playlist: string
  }
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  const { city, playlist } = params
  const cityData = songsData[city.toLowerCase()]

  if (!cityData) return notFound()

  const playlistData = cityData.playlists?.find(
    (pl) => pl.name.toLowerCase().replace(/\s+/g, '-') === playlist.toLowerCase()
  )

  const { playSong, currentSong } = useMusic()

  if (!playlistData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Playlist not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      {/* Playlist Hero Section */}
      <div className="relative w-full h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${playlistData.cover})` }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col justify-end h-full p-6">
          <h1 className="text-4xl font-bold capitalize">{playlistData.name}</h1>
          <p className="text-gray-300 mt-1">Enjoy handpicked songs from {city}</p>
        </div>
      </div>

      {/* Song List */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">🎧 Songs</h2>
        {playlistData.songs?.map((song, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white/10 hover:bg-white/20 transition p-4 rounded-lg backdrop-blur-lg"
          >
            <div className="flex items-center gap-4">
              <img src={song.cover || '/default-cover.jpg'} alt={song.title} className="w-14 h-14 rounded object-cover" />
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
  )
}
