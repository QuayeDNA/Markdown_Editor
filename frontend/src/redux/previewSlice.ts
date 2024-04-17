// src/redux/previewSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: {
    isPreviewExpanded: false,
  },
  reducers: {
    togglePreview: state => {
      state.isPreviewExpanded = !state.isPreviewExpanded;
    },
  },
});

export const { togglePreview } = previewSlice.actions;

export default previewSlice.reducer;