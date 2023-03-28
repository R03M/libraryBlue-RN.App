import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import companyReducer from './companySlice';
import itemReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    item: itemReducer,
  },
});
