import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {activePageReducer, childCollectionReducer, isAuthenticatedReducer} from "../features";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

const reducerCollection = combineReducers({
  childCollection: childCollectionReducer,
  isAuthenticated: isAuthenticatedReducer,
  activePage: activePageReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducerCollection);

export const store = configureStore({
  reducer: persistedReducer,
  /**
   * redux-thunk is already included in the store as middleware
   */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
