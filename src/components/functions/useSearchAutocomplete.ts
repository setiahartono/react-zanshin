import { useEffect, useRef, useState } from 'react'

export type Suggestion = {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

export function useSearchAutocomplete(onSearch: (query: string) => void) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  useEffect(() => {
    if (inputValue.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            inputValue
          )}&limit=5&countrycodes=id`
        )
        const data: Suggestion[] = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.display_name)
    setShowSuggestions(false)
    onSearchRef.current(suggestion.display_name)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false)
      onSearchRef.current(inputValue)
    }
  }

  return {
    inputValue,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSuggestionClick,
    handleKeyPress
  }
}
