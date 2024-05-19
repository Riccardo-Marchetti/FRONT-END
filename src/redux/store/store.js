import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookingReducers from "../reducers/Ticket";
import { ticketReducer } from "../reducers/BookTicket";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const globalReducers = combineReducers({
  ticket: bookingReducers,
  bookTicket: ticketReducer,
});
const persistedReducer = persistReducer(persistConfig, globalReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
