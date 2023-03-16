import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
    },
    setUserTokenReducer: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUserReducer, setUserTokenReducer } = userSlice.actions;

export default userSlice.reducer;
