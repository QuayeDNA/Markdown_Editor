// store.ts
import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './documentSlice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
  },
});

// Typescript type for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;