import { createSlice } from "@reduxjs/toolkit";

const othersInitialSlice = {
  screenSize: null,
};

const miscellaneous = createSlice({
  name: "others",
  initialState: othersInitialSlice,
  reducers: {
    updateScreenSize(state, action) {
      state.screenSize = action.payload.screenSize;
    },
  },
});

export const { updateScreenSize } = miscellaneous.actions;
export default miscellaneous.reducer;
