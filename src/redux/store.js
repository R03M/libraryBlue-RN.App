import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import companyReducer from './companySlice';
import itemReducer from './itemSlice';
import settingsReducer from './settingsSlice';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    item: itemReducer,
    settings: settingsReducer,
  },
  middleware,
});