import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import companySlice from "./companySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companySlice
  },
});
