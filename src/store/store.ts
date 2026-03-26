import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
