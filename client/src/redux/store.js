import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PURGE,
  PAUSE,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskSlice from "./taskSlice";
import userSlice from "./userSlice";
import { getDefaultNormalizer } from "@testing-library/react";

const persitConfig = { key: "root", storage, version: 1 };
const rootReducer = combineReducers({
  task: taskSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PURGE, PAUSE, REGISTER, REHYDRATE, PERSIST],
      },
    }),
});
export const persistor = persistStore(store);
