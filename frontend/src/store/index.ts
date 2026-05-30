import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authStorage } from "../features/auth/authStorage";

const persistedAuth = authStorage.load();

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    auth: {
      token: persistedAuth.token,
      role: persistedAuth.role,
      userId: persistedAuth.userId
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
