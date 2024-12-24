import { createSlice } from "@reduxjs/toolkit";

const initialAdminState = {
  transactionsTable: [],
  usersTable: [],
  loansTable: [],
  cardsTable: [],
  transfersTable: [],
  supportsTable: [],
};

const admin = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    populateTransactions(state, action) {
      state.transactionsTable = action.payload.transactions;
    },
    populateUsers(state, action) {
      state.usersTable = action.payload.users;
    },
    populateLoans(state, action) {
      state.loansTable = action.payload.loans;
    },
    populateCards(state, action) {
      state.cardsTable = action.payload.cards;
    },
    populateSupport(state, action) {
      state.supportsTable = action.payload.supports;
    },
    populateTransfers(state, action) {
      state.transfersTable = action.payload.transfers;
    },
  },
});

export const {
  populateTransactions,
  populateCards,
  populateLoans,
  populateSupport,
  populateTransfers,
  populateUsers,
} = admin.actions;
export default admin.reducer;
