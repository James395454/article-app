import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth";
import { articlesSlice } from "./articles/articles";

export const store = configureStore({
  devTools:
    import.meta.env.VITE_NODE_ENV === "development" ? { trace: true } : false,
  reducer: { auth: authSlice.reducer, articles: articlesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
