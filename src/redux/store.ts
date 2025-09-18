import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./slice";
import rootSaga from "./handler";
import { MMKVStorage } from "../utils/LocalStorage";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: MMKVStorage,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
