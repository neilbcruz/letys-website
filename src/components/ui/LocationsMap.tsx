import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location } from "@/data/locations";

// Fix default Leaflet icons for Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Red icon for active marker
const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Auto-fit bounds component
function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.coords.lat, loc.coords.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
}

interface LocationsMapProps {
  locations: Location[];
  activeLocation: string | null;
  setActiveLocation: (id: string | null) => void;
}

export default function LocationsMap({
  locations,
  activeLocation,
  setActiveLocation,
}: LocationsMapProps) {
  // Safety check
  if (!locations || locations.length === 0) {
    return <div>No locations to display</div>;
  }

  return (
    <MapContainer
      style={{ width: "100%", height: "300px" }}
      center={[locations[0].coords.lat, locations[0].coords.lng]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBounds locations={locations} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.coords.lat, loc.coords.lng]}
          icon={activeLocation === loc.id ? activeIcon : DefaultIcon}
          eventHandlers={{
            click: () =>
              setActiveLocation(activeLocation === loc.id ? null : loc.id),
          }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}