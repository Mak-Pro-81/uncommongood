import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TFonts = "Inter" | "Roboto" | "Montserrat";

interface State {
  availableFonts: TFonts[];
  initialFont: TFonts;
  headerFont: TFonts;
  subHeaderFont: TFonts;
  bodyFont: TFonts;
}

const initialState: State = {
  availableFonts: ["Inter", "Roboto", "Montserrat"],
  initialFont: "Inter",
  headerFont: "Inter",
  subHeaderFont: "Inter",
  bodyFont: "Inter",
};

const typographySlice = createSlice({
  name: "typography",
  initialState,
  reducers: {
    setHeaderFont(state, action: PayloadAction<TFonts>) {
      state.headerFont = action.payload;
    },
    setSubHeaderFont(state, action: PayloadAction<TFonts>) {
      state.subHeaderFont = action.payload;
    },
    setBodyFont(state, action: PayloadAction<TFonts>) {
      state.bodyFont = action.payload;
    },
  },
});

export const { setHeaderFont, setSubHeaderFont, setBodyFont } =
  typographySlice.actions;
export default typographySlice.reducer;
