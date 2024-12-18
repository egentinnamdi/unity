import { createSlice } from "@reduxjs/toolkit";

const othersInitialSlice = {};

const miscellaneous = createSlice({
  name: "others",
  initialState: othersInitialSlice,
  reducers: {},
});

export const {} = miscellaneous.actions;
export default miscellaneous.reducer;
