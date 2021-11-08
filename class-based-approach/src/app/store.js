import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

export const store = createStore(persistedReducer,applyMiddleware(thunk,logger));
export const persistor = persistStore(store);
