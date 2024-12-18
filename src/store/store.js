import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import othersReducer from "./slices/miscellaneousSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    others: othersReducer,
  },
});

export { store };
