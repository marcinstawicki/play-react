import { configureStore } from '@reduxjs/toolkit';
import {activePageReducer, childCollectionReducer, isAuthenticatedReducer} from "../features";

export const store = configureStore({
  reducer: {
    childCollection: childCollectionReducer,
    isAuthenticated: isAuthenticatedReducer,
    activePage: activePageReducer
  },
});
