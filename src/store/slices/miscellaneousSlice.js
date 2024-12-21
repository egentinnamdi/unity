import { createSlice } from "@reduxjs/toolkit";

const othersInitialSlice = {
  screenSize: null,
  // Transfer status
  transferred: false,
  isFetchingUser: true,
  isFetchingBalance: true,
  deactivated: false,
};

const miscellaneous = createSlice({
  name: "others",
  initialState: othersInitialSlice,
  reducers: {
    updateScreenSize(state, action) {
      state.screenSize = action.payload.screenSize;
    },
    updateTransferStatus(state, action) {
      state.transferred = action.payload.transferred;
      state.deactivated = action.payload.deactivated;
    },
    retrieveUserDataStatus(state, action) {
      state.isFetchingBalance = action.payload.isFetchingBalance;
      state.isFetchingUser = action.payload.isFetchingUser;
    },
    deactivatedTransfer(state, action) {
      state.deactivated = action.payload.deactivated;
      state.transferred = action.payload.transferred;
    },
  },
});

export const {
  updateScreenSize,
  updateTransferStatus,
  retrieveUserDataStatus,
  deactivatedTransfer,
} = miscellaneous.actions;
export default miscellaneous.reducer;
