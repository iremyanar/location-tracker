import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addLocation } from "../features/locationSlice";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { SketchPicker } from "react-color";

const MapComponent = dynamic(() => import("../components/Map"), { ssr: false });

const AddLocation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSelectLocation = (coords: {
    latitude: number;
    longitude: number;
  }) => {
    setSelectedCoords(coords);
  };

  const handleAddLocation = () => {
    if (!name || !selectedCoords) {
      alert("Lütfen bir konum adı girin ve haritada bir noktaya tıklayın!");
      return;
    }

    const newLocation = {
      id: uuidv4(),
      name,
      latitude: selectedCoords.latitude,
      longitude: selectedCoords.longitude,
      color,
    };

    dispatch(addLocation(newLocation));

    setName("");
    setSelectedCoords(null);
  };

  return (
    <div>
      <h1>Konum Ekle</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Konum adı girin"
      />
      <SketchPicker
        color={color}
        onChange={(newColor) => setColor(newColor.hex)}
      />
      <button onClick={handleAddLocation}>Konum Ekle</button>

      <MapComponent
        locations={locations}
        onSelectLocation={handleSelectLocation}
      />

      {selectedCoords && (
        <p>
          Seçilen Konum: Enlem: {selectedCoords.latitude.toFixed(4)}, Boylam:{" "}
          {selectedCoords.longitude.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default AddLocation;
