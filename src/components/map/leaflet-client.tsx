import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from '@tanstack/react-router'
import L from 'leaflet'
import type { City, Coordinates } from '@/types'
import 'leaflet/dist/leaflet.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

interface WorldMapClientProps {
  cities: City[]
  onCityClick?: (city: City) => void
}

export function WorldMapClient({ cities, onCityClick }: WorldMapClientProps) {
  return (
    <MapContainer
      center={[30, 0]}
      zoom={2}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.coordinates.lat, city.coordinates.lng]}
          eventHandlers={{
            click: () => onCityClick?.(city),
          }}
        >
          <Popup>
            <div className="min-w-[150px]">
              <h3 className="font-semibold">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.country}</p>
              <Link
                to="/cities/$cityId"
                params={{ cityId: city.id }}
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
              >
                View events →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

interface CityMapClientProps {
  coordinates: Coordinates
  name: string
  address?: string
}

function FlyToLocation({ coordinates }: { coordinates: Coordinates }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo([coordinates.lat, coordinates.lng], 15, { duration: 1.5 })
  }, [map, coordinates])

  return null
}

export function CityMapClient({
  coordinates,
  name,
  address,
}: CityMapClientProps) {
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ minHeight: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation coordinates={coordinates} />
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>
          <div>
            <h3 className="font-semibold">{name}</h3>
            {address && <p className="text-sm text-gray-600">{address}</p>}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
