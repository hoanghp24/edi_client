import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shippingReducer from '../features/shipping/shippingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipping: shippingReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
