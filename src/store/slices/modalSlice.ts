import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  showModal: boolean;
}

const initialState: State = {
  showModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload || false;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
