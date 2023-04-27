import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ColorTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ACCENT = "accent",
}

export interface PaletteColor {
  colorName: ColorTypes;
  colorValue: string;
}

export interface Palette {
  paletteName: string;
  paletteColors: PaletteColor[];
}

interface State {
  oldPaletteName: string;
  palettes: Palette[];
  selectedPalette: Palette;
}

const initialState: State = {
  oldPaletteName: "",
  palettes: [],
  selectedPalette: {
    paletteName: "",
    paletteColors: [],
  },
};

const paletteSlice = createSlice({
  name: "palettes",
  initialState,
  reducers: {
    setOldPaletteName(state, action: PayloadAction<string>) {
      state.oldPaletteName = action.payload;
    },
    setPalettes(state, action: PayloadAction<Palette>) {
      if (state.oldPaletteName === "") {
        state.palettes = state.palettes.concat(action.payload);
      } else {
        const paletteIndex = state.palettes.findIndex(
          (obj) => obj.paletteName === state.oldPaletteName
        );
        state.palettes[paletteIndex] = action.payload;
        state.oldPaletteName = "";
      }
    },
    setSelectedPalette(state, action) {
      console.log(action.payload);
      if (action.payload) {
        const selectedPaletteIndex = state.palettes.findIndex(
          (obj) => obj.paletteName === action.payload
        );
        state.selectedPalette = state.palettes[selectedPaletteIndex];
      }
    },
  },
});

export const { setPalettes, setOldPaletteName, setSelectedPalette } =
  paletteSlice.actions;
export default paletteSlice.reducer;
