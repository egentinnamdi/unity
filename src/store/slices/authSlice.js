import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  username: "",
  email: "",
  phone: "",
  loggedIn: false,
  token: "",
  otp: "",
  isLoading: false,
};

const auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    authRegister(state, action) {
      const { username, email, phone, password } = action.payload;
      state.username = username;
      state.email = email;
      state.phone = phone;
    },
    authLogin(state, action) {
      state.email = action.payload.email;
      state.isLoading = true;
    },
    authLoggedIn(state, action) {
      (state.loggedIn = true), (state.token = action.payload.token);
      state.isLoading = false;
    },
    authOtpDetails(state, action) {
      const { otp, email } = action.payload;

      if (email) {
        state.email = action.payload.email;
      }
      if (otp) {
        state.otp = action.payload.otp;
      }
    },
    authResetPassword(state, action) {
      state.phone = "hello";
    },
  },
});

export const {
  authRegister,
  authLogin,
  authLoggedIn,
  authResetPassword,
  authOtpDetails,
} = auth.actions;
export default auth.reducer;
