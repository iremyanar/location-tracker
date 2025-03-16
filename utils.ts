export const getCoordinates = async (locationName: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      locationName
    )}`
  );
  const data = await response.json();

  if (data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } else {
    return null;
  }
};
