import { useEffect, useRef } from 'react'
import L from 'leaflet'
import type { Dojo } from '../api/dojos'
import { centerPosition, setUserMarker } from './functions/userMarker'
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

  // Always keep latest callback (avoids stale closure)
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

    // Try to center map on user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          map.setView([coords.latitude, coords.longitude], 15)
        },
        (err) => {
          console.warn('Unable to get user location:', err.message)
        }
      )
    }

    map.on('click', (e) => {
      if (isLoading) return

      const { lat, lng } = e.latlng

      onLocationSelectRef.current(lat, lng)

      setUserMarker(
        map,
        userMarkerRef,
        { lat, lng },
        isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda'
      )
      
    })
  }, [isLoading])

  // Render dojo markers
  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    dojos.forEach((dojo) => {
      const marker = L.marker([dojo.lat, dojo.lng])
        .addTo(mapRef.current!)
        .bindPopup(`<b>${dojo.title}</b>`)

      markersRef.current.push(marker)
    })
  }, [dojos])

  // Handle search location change
  useEffect(() => {
    if (!mapRef.current || !searchLocation) return

    setUserMarker(
      mapRef.current,
      userMarkerRef,
      searchLocation,
      isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda'
    )

    mapRef.current.setView(
      [searchLocation.lat, searchLocation.lng],
      mapRef.current.getZoom()
    )
  }, [searchLocation])

  // Update user marker when loading state changes
  useEffect(() => {
    if (!mapRef.current || !searchLocation) return

    setUserMarker(
      mapRef.current,
      userMarkerRef,
      searchLocation,
      isLoading ? 'Sedang memuat...' : 'Lokasi Pencarian Anda'
    )

    centerPosition(mapRef.current, searchLocation)
  }, [isLoading])

  return (
    <div className="mapContainer">
      <div id="map" className="mapElement" />
      {isLoading && (
        <div className="loadingOverlay">
          Mencari dojo di lokasi ini...
        </div>
      )}
    </div>
  )
}
