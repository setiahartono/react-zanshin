const FETCH_DOJO_URL = import.meta.env.VITE_FETCH_DOJO_URL

export type Dojo = {
  id: string
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

  const res = await fetch(FETCH_DOJO_URL, {
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
