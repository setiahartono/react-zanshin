import { useSearchAutocomplete } from './functions/useSearchAutocomplete'
import './css/SearchBox.css'

type Props = {
  distance: number
  onDistanceChange: (value: number) => void
  onSearch: (query: string, distance: number) => void
  isLoading: boolean
}

export default function SearchBox({
  distance,
  onDistanceChange,
  onSearch,
  isLoading
}: Props) {
  const handleSearch = (query: string) => {
    onSearch(query, distance)
  }

  const {
    inputValue,
    suggestions,
    showSuggestions,
    handleInputChange,
    handleSuggestionClick,
    handleKeyPress
  } = useSearchAutocomplete(handleSearch)

  return (
    <div className="searchContainer">
      <div className="searchInputContainer">
        <input
          type="text"
          placeholder="Masukan tempat atau alamat"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="searchInput"
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestionsList">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestionItem"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}

        <input
          type="number"
          value={distance}
          min={1}
          max={15}
          onChange={(e) => onDistanceChange(+e.target.value)}
          disabled={isLoading}
          className="distanceInput"
        />
        <span className="distanceUnit">KM</span>
      </div>
    </div>
  )
}
