import { createSlice } from "@reduxjs/toolkit";

const initialAdminState = {
  transactionsTable: [],
};

const admin = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    populateTransactions(state, action) {
      state.transactionsTable = action.payload.transactions;
    },
  },
});

export const { populateTransactions } = admin.actions;
export default admin.reducer;
