import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageTitle {
  title: string;
  description: string;
}

const initialState: PageTitle = {
  title: "",
  description: "",
};

export const pageTitleSlice = createSlice({
  name: "pageTitleState",
  initialState,
  reducers: {
    addPageTitle: (state, action: PayloadAction<PageTitle>) => {
      state.description = action.payload.description;
      state.title = action.payload.title;
    },
  },
});

export const { addPageTitle } = pageTitleSlice.actions;

export default pageTitleSlice.reducer;
