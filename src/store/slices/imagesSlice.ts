import {
  createSlice,
  createAsyncThunk,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Routes } from "@/routes";

interface State {
  fetchedImages: {}[];
  images: string[];
  status: string;
}

const initialState: State = {
  fetchedImages: [],
  images: [],
  status: "",
};

// fetch images
export const fetchImages = createAsyncThunk<
  string[],
  undefined,
  { rejectValue: string }
>("images/fetchImages", async (_, { rejectWithValue }) => {
  const res = await fetch(`${Routes.ROOT}${Routes.UPLOADED_IMAGES}`);
  if (!res.ok) {
    return rejectWithValue("Server error!");
  }
  const data = await res.json();
  return data;
});

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.status = "resolved";
      state.fetchedImages = action.payload;
    });
  },
});

export const { setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
