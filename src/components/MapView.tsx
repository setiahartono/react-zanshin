import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { Dojo } from '../api/dojos'
import './css/MapView.css'

type Props = {
  dojos: Dojo[]
  onLocationSelect: (lat: number, lng: number) => void
  searchLocation: { lat: number; lng: number } | null
  isLoading: boolean
}

export default function MapView({
  dojos,
  onLocationSelect,
  searchLocation,
  isLoading
}: Props) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const userMarkerRef = useRef<L.Marker | null>(null)

  const onLocationSelectRef = useRef(onLocationSelect)
  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect
  }, [onLocationSelect])

  // Initialize map ONCE
  useEffect(() => {
    if (mapRef.current) return

    const map = L.map('map').setView([-6.2, 106.8], 15)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Try to set map to user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          map.setView([latitude, longitude], 15)
        },
        (error) => {
          console.warn('Unable to get user location:', error.message)
        }
      )
    }

    map.on('click', (e) => {
      if (isLoading) return

      const { lat, lng } = e.latlng

      // ✅ use the ref to get the latest distance-aware callback
      onLocationSelectRef.current(lat, lng)

      if (userMarkerRef.current) {
        userMarkerRef.current.remove()
      }

      userMarkerRef.current = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda')
        .openPopup()
    })
  }, [isLoading])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    dojos.forEach((dojo) => {
      const marker = L.marker([dojo.lat, dojo.lng])
        .addTo(mapRef.current!)
        .bindPopup(`<b>${dojo.title}</b>`)

      markersRef.current.push(marker)
    })
  }, [dojos])

  // Handle search location
  useEffect(() => {
    if (!mapRef.current || !searchLocation) return

    if (userMarkerRef.current) {
      userMarkerRef.current.remove()
    }

    userMarkerRef.current = L.marker([searchLocation.lat, searchLocation.lng])
      .addTo(mapRef.current)
      .bindPopup(isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda')
      .openPopup()

    mapRef.current.setView([searchLocation.lat, searchLocation.lng], 15)
  }, [searchLocation])

  // Update popup when loading state changes
  useEffect(() => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setPopupContent(
        isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda'
      )
    }
  }, [isLoading])

  return (
    <div className="mapContainer">
      <div id="map" className="mapElement" />
      {isLoading && <div className="loadingOverlay">Mencari dojo di lokasi ini...</div>}
    </div>
  )
}
