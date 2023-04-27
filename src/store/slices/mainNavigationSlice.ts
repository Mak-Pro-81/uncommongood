import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  expandNav: boolean;
}

const initialState: State = {
  expandNav: false,
};

const mainNavigationSlice = createSlice({
  name: "mainnavigation",
  initialState,
  reducers: {
    toggleExpandNavigation(state, action: PayloadAction<boolean>) {
      state.expandNav = action.payload || false;
    },
  },
});

export const { toggleExpandNavigation } = mainNavigationSlice.actions;
export default mainNavigationSlice.reducer;
