import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postSlice, postReducer } from '~/feature/posts/posts-slice';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
const reducers = {
  [postSlice.name]: postReducer,
};

const combinedReducers = combineReducers(reducers);
export const makeStore = () => {
  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

export const makePersistor = (store: AppStore) => persistStore(store);

export type Persistor = ReturnType<typeof makePersistor>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
