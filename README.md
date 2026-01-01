# React Zanshin - Dojo Finder

A modern React application for discovering and exploring martial arts dojos on an interactive map. Built with TypeScript, Vite, and Leaflet, this app helps users find nearby dojos and get directions.

## Features

- **Interactive Map**: View dojo locations on a responsive Leaflet-powered map
- **Automatic Location Detection**: Automatically centers the map on your current location (with permission)
- **Nearest Dojo Finder**: Automatically identifies and highlights the closest dojo to your location
- **Search Functionality**: Search for dojos by location or criteria
- **Click to Explore**: Click anywhere on the map to search for dojos in that area
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Mapping**: Leaflet with OpenStreetMap tiles
- **Styling**: CSS modules
- **Linting**: ESLint with TypeScript support

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/react-zanshin.git
   cd react-zanshin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Serve the production build locally:
```bash
npm run preview
```

### Linting
Check for code quality issues:
```bash
npm run lint
```

## Usage

1. **Grant Location Permission**: When prompted, allow the app to access your location for automatic map centering
2. **Explore the Map**: The map will show all available dojos as markers
3. **Find Nearest Dojo**: Your location marker will appear, and the nearest dojo's popup will open automatically
4. **Search**: Use the search bar to find specific dojos or locations
5. **Click to Search**: Click anywhere on the map to search for dojos in that area

## Project Structure

```
src/
├── api/
│   └── dojos.ts          # Dojo data and types
├── components/
│   ├── MapView.tsx       # Main map component with Leaflet integration
│   ├── SearchBar.tsx     # Search functionality
│   └── Sidebar.tsx       # Additional information panel
├── assets/               # Static assets
└── main.tsx             # App entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
