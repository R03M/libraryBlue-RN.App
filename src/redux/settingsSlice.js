import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {
    theme: "",
    useDeviceSettings: null,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettgReducer: (state, action) => {
      state.settings = action.payload;
    },
    updateThemeReducer: (state, action) => {
      action.payload === "light"
        ? (state.settings.theme = "light")
        : (state.settings.theme = "dark");
    },
    updateUDSReducer: (state, action) => {
      action.payload === true
        ? (state.settings.useDeviceSettings = true)
        : (state.settings.useDeviceSettings = false);
    },
  },
});

export const { setSettgReducer, updateThemeReducer, updateUDSReducer } =
  settingsSlice.actions;

export default settingsSlice.reducer;
