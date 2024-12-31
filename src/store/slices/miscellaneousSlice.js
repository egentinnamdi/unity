import { createSlice } from "@reduxjs/toolkit";

const othersInitialSlice = {
  screenSize: null,
  // Transfer status
  transferred: false,
  // isFetchingUser: true,
  // isFetchingBalance: true,
  deactivated: false,
  globalIsLoading: false,
  page: 1,
  next: 5,
  previous: 0,
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
    // retrieveUserDataStatus(state, action) {
    //   state.isFetchingBalance = action.payload.isFetchingBalance;
    //   state.isFetchingUser = action.payload.isFetchingUser;
    // },
    deactivatedTransfer(state, action) {
      state.deactivated = action.payload.deactivated;
      state.transferred = action.payload.transferred;
    },
    updateGlobalLoadingStatus(state, action) {
      state.globalIsLoading = action.payload.loading;
    },
    updatePage(state, action) {
      const pageDiff = 5 * (action.payload.page - state.page);
      state.page = action.payload.page;
      state.previous += pageDiff;
      state.next += pageDiff;
    },
    resetPage(state) {
      state.page = 1;
      state.previous = 0;
      state.next = 5;
    },
  },
});

export const {
  updateScreenSize,
  updateTransferStatus,
  // retrieveUserDataStatus,
  deactivatedTransfer,
  updateGlobalLoadingStatus,
  updatePage,
  resetPage,
} = miscellaneous.actions;
export default miscellaneous.reducer;
