'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/navigation'

// Fix icon not displaying properly
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const cities = [
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { name: 'Trichy', lat: 10.7905, lng: 78.7047 },
  { name: 'Salem', lat: 11.6643, lng: 78.1460 }
]

export default function CityMap() {
  const router = useRouter()

  return (
    <div className="w-full h-[90vh] rounded-xl overflow-hidden shadow-lg">
      <MapContainer center={[10.85, 78.7]} zoom={7} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.name} position={[city.lat, city.lng]}>
            <Popup>
              <div className="text-sm font-semibold">
                {city.name}
                <br />
                <button
                  onClick={() => router.push(`/${city.name.toLowerCase()}`)}
                  className="text-blue-500 underline mt-1"
                >
                  Explore Music →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
