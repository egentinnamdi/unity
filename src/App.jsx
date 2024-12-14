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
import createUser from "./utils/createUser";
import PageNotFound from "./pages/PageNotFound";
import TableRoutes from "./Routes/TableRoutes";
import SuperAdminTable from "./pages/SuperAdminTable";

// Dummy User

const id = "efedbc5d-5adf-44fd-a23d-823f9f24b957";
const dummyUser = {
  firstName: "Michael",
  lastName: "Brown",
  username: "michaelbrown",
  gender: "male",
  email: "michael@example.com",
  phone: "08098765432",
  password: "SecurePass789",
  profilePicture: "profile2.jpg",
  // birthdate: new Date("1990-03-10"),
  transactionPin: "2345",
  taxCode: "TX45678",
};

const superNav = [
  "transactions",
  "users",
  "cards",
  "transfers",
  "loans",
  "support",
];

export default function App() {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints?.down("lg"));
  createUser(dummyUser);
  return (
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
                element={<SuperAdminTable header={item} data="hello" />}
              />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    // {/* </ThemeProvider> */}
  );
}
