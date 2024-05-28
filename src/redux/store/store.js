import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookingReducers from "../reducers/Ticket";
import { ticketReducer } from "../reducers/BookTicket";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const globalReducers = combineReducers({
  ticket: bookingReducers,
  bookTicket: ticketReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, globalReducers);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Create persistor
let persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
