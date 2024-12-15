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
import { createUser } from "./utils/CRUD";
import PageNotFound from "./pages/PageNotFound";
import SuperAdminTable from "./pages/SuperAdminTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Dummy User

const dummyUser = {
  firstName: "David",
  lastName: "Garcia",
  username: "davidgarcia",
  gender: "male",
  email: "david@example.com",
  phone: "08145678901",
  password: "DavidPass2023",
  profilePicture: "profile10.jpg",
  // "birthdate": "1996-05-02",
  transactionPin: "8901",
  taxCode: "TX77889",
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
  console.log(createUser(dummyUser));
  return (
    <QueryClientProvider client={queryClient}>
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
      // {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}
