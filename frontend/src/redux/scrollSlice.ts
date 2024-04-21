// scrollSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  editorScrollTop: number;
  previewScrollTop: number;
}

const initialState: ScrollState = {
  editorScrollTop: 0,
  previewScrollTop: 0,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    updateEditorScrollTop(state, action: PayloadAction<number>) {
      state.editorScrollTop = action.payload;
    },
    updatePreviewScrollTop(state, action: PayloadAction<number>) {
      state.previewScrollTop = action.payload;
    },
  },
});

export const { updateEditorScrollTop, updatePreviewScrollTop } = scrollSlice.actions;
export default scrollSlice.reducer;
