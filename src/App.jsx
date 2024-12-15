import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import AccountBalance from "./pages/AccountBalance";
import Transactions from "./pages/Transactions";
import Transfers from "./pages/Transfers";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Cards from "./pages/Cards";
import Loan from "./pages/Loan";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/PageNotFound";
import SuperAdminTable from "./pages/SuperAdminTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/UserContext";

// Dummy User

const dummyUser = {
  username: "gracewalker",
  email: "grace@example.com",
  phone: "07066554433",
  password: "GracePass2025",
};

const superNav = [
  "transactions",
  "users",
  "cards",
  "transfers",
  "loans",
  "support",
];

const queryClient = new QueryClient();

export default function App() {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints?.down("lg"));
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout screenSize={screenSize} />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route
                path="dashboard"
                element={<Dashboard screenSize={screenSize} />}
              />
              <Route
                path="wallets"
                element={<AccountBalance screenSize={screenSize} />}
              />
              <Route path="transfers" element={<Transfers />} />
              <Route path="cards" element={<Cards />} />
              <Route path="loans" element={<Loan />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />
              <Route path="log out" element={<Logout />} />
              <Route path="table">
                {superNav.map((item) => (
                  <Route
                    key={item}
                    path={item}
                    element={
                      <SuperAdminTable
                        screenSize={screenSize}
                        header={item}
                        data="hello"
                      />
                    }
                  />
                ))}
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext>
    </QueryClientProvider>
  );
}
