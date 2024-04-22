import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth";

export const store = configureStore({
  devTools:
    import.meta.env.VITE_NODE_ENV === "development" ? { trace: true } : false,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  reducer: { auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
