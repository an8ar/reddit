import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "~/feature/posts/posts-slice";
const reducers = {
  [postsSlice.name]: postsSlice.reducer,
};

const combinedReducers = combineReducers(reducers);
export const makeStore = () => {
  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {},
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
