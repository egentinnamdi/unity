import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  id: "",
  token: "",
  accountNumber: "",
  balance: 0,
  firstName: "",
  lastName: "",
  gender: "",
  profilePicture: "",
  birthdate: "",
  taxCode: "123456",
  role: "",
  transactionPin: "",
  isLoading: false,
  loggedOut: false,
  transactions: [],
  username: "",
  password: "",
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
        username,
        profilePicture,
        role,
        birthdate,
        gender,
        password,
        location,
      } = action.payload;

      state.id = id;
      state.accountNumber = accountNumber;
      state.firstName = firstName;
      state.lastName = lastName;
      state.balance = balance;
      state.transactionPin = transactionPin;
      state.username = username;
      state.profilePicture = profilePicture;
      state.role = role;
      state.gender = gender;
      state.birthdate = birthdate;
      state.password = password;
      state.location = location;
    },
    updateTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
    updateBalanceAfterLoan(state, action) {
      state.balance += action.payload.balance;
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
  updateBalanceAfterLoan,
} = user.actions;
export default user.reducer;
