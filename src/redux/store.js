import { configureStore } from '@reduxjs/toolkit';
import { contactsReducers } from './contactSlice';
import filterReducer from './filterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contactsStore',
  storage,
  whitelist: ['contacts'],
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducers
);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filter: filterReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: true,
});

export const persistor = persistStore(store);
