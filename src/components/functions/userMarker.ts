import L from 'leaflet'

type LatLng = { lat: number; lng: number }

export function setUserMarker(
  map: L.Map,
  markerRef: React.MutableRefObject<L.Marker | null>,
  location: LatLng,
  popupText: string
) {
  // Remove previous marker
  if (markerRef.current) {
    markerRef.current.remove()
  }

  // Create new marker
  const marker = L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup(popupText)
    .openPopup()

  markerRef.current = marker
}


export function centerPosition(
  map: L.Map,
  location: LatLng,
) {
  map.setView([location.lat, location.lng, map.getZoom()])
}
