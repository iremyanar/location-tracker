import L from "leaflet";

const getCustomIcon = (color: string) => {
  const svgIcon = `
    <svg width="30" height="45" viewBox="0 0 30 45" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M15,0 C23,0 30,7 30,15 C30,27 15,45 15,45 C15,45 0,27 0,15 C0,7 7,0 15,0 Z"/>
      <circle cx="15" cy="15" r="7" fill="white"/>
    </svg>
  `;

  const encodedIcon = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

  return new L.Icon({
    iconUrl: encodedIcon,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export default getCustomIcon;
