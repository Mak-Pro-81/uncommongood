import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import clipboardReducer from "./slices/clipboardSlice";
import imagesReducer from "./slices/imagesSlice";
import palettesReducer from "./slices/palettesSlice";
import typographyReducer from "./slices/typographySlice";
import mainNavigationReducer from "./slices/mainNavigationSlice";

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    modal: modalReducer,
    clipboard: clipboardReducer,
    images: imagesReducer,
    palettes: palettesReducer,
    typography: typographyReducer,
    mainnavigation: mainNavigationReducer,
  },
  devTools: true,
});

export default store;
