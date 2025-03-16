import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../store";
import { updateLocation } from "../features/locationSlice";
import { SketchPicker } from "react-color";

const EditLocation = () => {
  const router = useRouter();
  const { id } = router.query;

  const locationId: string = Array.isArray(id) ? id[0] : id ?? "";

  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);

  const existingLocation = locations.find((loc) => loc.id === locationId);

  const [name, setName] = useState(existingLocation?.name || "");
  const [color, setColor] = useState(existingLocation?.color || "#ff0000");

  useEffect(() => {
    if (existingLocation) {
      setName(existingLocation.name);
      setColor(existingLocation.color);
    }
  }, [existingLocation]);

  const handleColorChange = (newColor: { hex: string }) => {
    setColor(newColor.hex);
  };

  const handleUpdateLocation = () => {
    if (!name.trim()) {
      alert("Lütfen bir konum adı girin!");
      return;
    }

    const updatedLocation = {
      id: locationId,
      name,
      color,
    };

    dispatch(updateLocation(updatedLocation));
    router.push("/locations");
  };

  return (
    <div>
      <h1>Konumu Düzenle</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Konum adı girin"
      />
      <SketchPicker color={color} onChange={handleColorChange} />
      <button onClick={handleUpdateLocation}>Güncelle</button>
    </div>
  );
};

export default EditLocation;
