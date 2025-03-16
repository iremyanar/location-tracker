import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import getCustomIcon from "../utils/customIcon";

const RoutePage = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [sortedLocations, setSortedLocations] = useState(locations);

  const [userPosition, setUserPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Konum alınamadı:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (userPosition && locations.length > 0) {
      const sorted = [...locations].sort((a, b) => {
        const distanceA = Math.sqrt(
          Math.pow(a.latitude - userPosition.latitude, 2) +
            Math.pow(a.longitude - userPosition.longitude, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(b.latitude - userPosition.latitude, 2) +
            Math.pow(b.longitude - userPosition.longitude, 2)
        );
        return distanceA - distanceB;
      });
      setSortedLocations(sorted);
    }
  }, [userPosition, locations]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[41.0082, 28.9784]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Kullanıcının mevcut konumu */}
        {userPosition && (
          <Marker
            position={[userPosition.latitude, userPosition.longitude]}
            icon={L.icon({
              iconUrl:
                "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>Mevcut Konumunuz</Popup>
          </Marker>
        )}

        {/* Kaydedilmiş konumları göster */}
        {sortedLocations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={getCustomIcon(loc.color)}
          >
            <Popup>
              <strong>{loc.name}</strong> <br />
              Enlem: {loc.latitude.toFixed(4)}, Boylam:{" "}
              {loc.longitude.toFixed(4)}
            </Popup>
          </Marker>
        ))}

        {/* Rota çizme (En yakın noktadan başlayarak) */}
        {sortedLocations.length > 1 && (
          <Polyline
            positions={sortedLocations.map((loc) => [
              loc.latitude,
              loc.longitude,
            ])}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default RoutePage;
