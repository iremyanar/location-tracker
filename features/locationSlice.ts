import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    updateLocation: (
      state,
      action: PayloadAction<{ id: string; name: string; color: string }>
    ) => {
      const { id, name, color } = action.payload;
      const location = state.locations.find((loc) => loc.id === id);
      if (location) {
        location.name = name;
        location.color = color;
      }
    },
  },
});

export const { addLocation, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
