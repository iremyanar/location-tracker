import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getCustomIcon from "../utils/customIcon";
import { useState } from "react";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}

interface MapProps {
  locations: Location[];
  onSelectLocation: (coords: { latitude: number; longitude: number }) => void;
}

const MapComponent: React.FC<MapProps> = ({ locations, onSelectLocation }) => {
  const [tempMarker, setTempMarker] = useState<{
    latitude: number;
    longitude: number;
    color: string;
  } | null>(null);

  return (
    <MapContainer
      center={[41.0082, 28.9784]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <LocationMarker
        onSelectLocation={(coords) => {
          setTempMarker({ ...coords, color: "#ff0000" });
          onSelectLocation(coords);
        }}
      />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          icon={getCustomIcon(loc.color)}
        >
          <Popup>
            <strong>{loc.name}</strong> <br />
            Enlem: {loc.latitude.toFixed(4)}, Boylam: {loc.longitude.toFixed(4)}
          </Popup>
        </Marker>
      ))}

      {tempMarker && (
        <Marker
          position={[tempMarker.latitude, tempMarker.longitude]}
          icon={getCustomIcon(tempMarker.color)}
        />
      )}
    </MapContainer>
  );
};

interface LocationMarkerProps {
  onSelectLocation: (coords: { latitude: number; longitude: number }) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  onSelectLocation,
}) => {
  useMapEvents({
    click(e) {
      onSelectLocation({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
};

export default MapComponent;
