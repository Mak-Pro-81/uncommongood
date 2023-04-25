import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  copied: boolean;
}

const initialState: State = {
  copied: false,
};

const modalSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    toggleCopy(state, action: PayloadAction<boolean>) {
      state.copied = action.payload || false;
    },
  },
});

export const { toggleCopy } = modalSlice.actions;
export default modalSlice.reducer;
