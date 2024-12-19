import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  id: "",
  token: "",
  accountNumber: "",
  balance: 0,
  firstName: "",
  lastName: "",
  gender: "Female",
  profilePicture: "",
  birthdate: "",
  taxCode: "123456",
  balance: 1000,
  role: "user",
  transactionPin: "",
  isLoading: false,
  loggedOut: false,
  transactions: [],
};

const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    createTransactionPin(state, action) {
      state.transactionPin = action.payload.transactionPin;
    },
    logout(state) {
      state.loggedOut = true;
      state.token = "";
    },
    updateId(state, action) {
      state.id = action.payload.id;
    },
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    updateUser(state, action) {
      const {
        accountNumber,
        id,
        firstName,
        lastName,
        balance,
        transactionPin,
      } = action.payload;

      state.id = id;
      state.accountNumber = accountNumber;
      state.firstName = firstName;
      state.lastName = lastName;
      state.balance = balance;
      state.transactionPin = transactionPin;
    },
    updateTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

export const {
  createTransactionPin,
  logout,
  updateId,
  loading,
  updateUser,
  updateTransactions,
} = user.actions;
export default user.reducer;
