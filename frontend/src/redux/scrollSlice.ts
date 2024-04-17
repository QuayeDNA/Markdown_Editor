import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  position: number;
}

const initialState: ScrollState = {
  position: 0,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
  },
});

export const { setPosition } = scrollSlice.actions;

export default scrollSlice.reducer;