import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import clipboardReducer from "./slices/clipboardSlice";
import imagesReducer from "./slices/imagesSlice";

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    modal: modalReducer,
    clipboard: clipboardReducer,
    images: imagesReducer,
  },
  devTools: true,
});

export default store;
