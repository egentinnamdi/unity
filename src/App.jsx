import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store/store";

// const superNav = [
//   "transactions",
//   "users",
//   "cards",
//   "transfers",
//   "loans",
//   "support",
// ];

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
        <UserContext>
          <Router />
        </UserContext>
      </Provider>
    </QueryClientProvider>
  );
}
