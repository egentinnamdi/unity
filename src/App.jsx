import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import AccountBalance from "./pages/AccountBalance";
import Transactions from "./pages/Transactions";
import Transfers from "./pages/Transfers";
import { ThemeProvider } from "@emotion/react";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

export default function App() {
  return (
    // <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wallets" element={<AccountBalance />} />
          <Route path="wallets/transfers" element={<Transfers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // {/* </ThemeProvider> */}
  );
}
