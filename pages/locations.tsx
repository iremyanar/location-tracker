import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/Map"), { ssr: false });

const LocationsPage = () => {
  const router = useRouter();
  const locations = useSelector((state: RootState) => state.location.locations);

  return (
    <div>
      <h1>Kaydedilen Konumlar</h1>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {loc.name} - Enlem: {loc.latitude.toFixed(4)}, Boylam:{" "}
            {loc.longitude.toFixed(4)}
            {/* 📌 Düzenle Butonu */}
            <button onClick={() => router.push(`/edit-location?id=${loc.id}`)}>
              Düzenle
            </button>
          </li>
        ))}
      </ul>
      {/* 📌 Harita bileşeni */}
      <MapComponent locations={locations} onSelectLocation={() => {}} />
    </div>
  );
};

export default LocationsPage;
