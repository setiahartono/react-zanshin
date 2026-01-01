const BACKEND_URL = 'http://0.0.0.0:8080/api/v1/nearby_dojos'

export type Dojo = {
  lat: number
  lng: number
  title: string
  description?: string
}

export async function fetchNearbyDojos(
  lat: number,
  lng: number,
  distance: number
): Promise<Dojo[]> {
  if (distance > 20) distance = 20

  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      distance
    })
  })

  const data = await res.json()
  return data.dojos ?? []
}
