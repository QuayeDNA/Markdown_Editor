// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import themeReducer from './themeSlice';
import previewReducer from './previewSlice';
import scrollReducer from './scrollSlice';
import documentReducer from './documentSlice';
import messageSlice from './messageSlice';


const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    preview: previewReducer,
    scroll: scrollReducer,
    document: documentReducer,
    messages: messageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;