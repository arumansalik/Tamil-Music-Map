'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogOut, Music, Settings } from 'lucide-react'

export default function ProfilePage() {
  const user = {
    name: 'Aruman Salik',
    email: 'aruman@example.com',
    avatar: '/user.png',
    totalPlayed: 58,
    favoriteCities: ['Chennai', 'Madurai'],
    recentSongs: [
      { title: 'Enna Solla Pogirai', city: 'Chennai' },
      { title: 'Kanmani Anbodu', city: 'Madurai' },
    ]
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-900 p-6 rounded-xl shadow-xl">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold">{user.totalPlayed}</h3>
          <p className="text-gray-400 text-sm">Songs Played</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold">{user.favoriteCities.length}</h3>
          <p className="text-gray-400 text-sm">Fav Cities</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold">6h</h3>
          <p className="text-gray-400 text-sm">Total Listening</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Premium</h3>
          <p className="text-gray-400 text-sm">Plan</p>
        </div>
      </div>

      {/* Recent Songs */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recently Played</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.recentSongs.map((song, index) => (
            <Card key={index} className="bg-zinc-800 text-white hover:shadow-lg transition">
              <CardContent className="p-4">
                <h4 className="text-lg font-medium">{song.title}</h4>
                <p className="text-gray-400 text-sm">From: {song.city}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-10 justify-center">
        <Button variant="default" className="gap-2"><Music size={18} /> Explore Music</Button>
        <Button variant="secondary" className="gap-2"><Settings size={18} /> Settings</Button>
        <Button variant="destructive" className="gap-2"><LogOut size={18} /> Logout</Button>
      </div>
    </div>
  )
}
