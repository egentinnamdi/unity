import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  id: "",
  token: "",
  accountNumber: "1234567890",
  balance: 0,
  firstName: "Jane",
  lastName: "Doe",
  gender: "Female",
  profilePicture: "",
  birthdate: "",
  taxCode: "123456",
  balance: 1000,
  role: "admin",
  transactionPin: "2345",
  loggedOut: false,
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
  },
});

export const { createTransactionPin, logout, updateId } = user.actions;
export default user.reducer;
