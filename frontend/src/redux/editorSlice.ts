// src/redux/editorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  currentContent: string;
}

const initialState: EditorState = {
  currentContent: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.currentContent = action.payload;
    },
  },
});

export const { updateContent } = editorSlice.actions;

export default editorSlice.reducer;