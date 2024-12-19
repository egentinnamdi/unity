import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { Router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  // const dispatch = useDispatch();
  // const theme = useThem();
  // const [logoutDialog, setLogoutDialog] = useState(false);
  // const screenSize = useMediaQuery(theme.breakpoints?.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} gutter={8} />
          <UserContext>
            <Router />
          </UserContext>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

// <Route
//               path="/"
//               element={
//                 <AppLayout
//                   setLogoutDialog={setLogoutDialog}
//                   screenSize={screenSize}
//                 />
//               }
//             >
//               <Route index element={<Navigate to="/dashboard" />} />
//               <Route
//                 path="dashboard"
//                 element={<Dashboard screenSize={screenSize} />}
//               />
//               <Route
//                 path="accounts"
//                 element={<AccountBalance screenSize={screenSize} />}
//               />
//               <Route path="transfers" element={<Transfers />} />
//               <Route path="cards" element={<Cards />} />
//               <Route path="loans" element={<Loan />} />
//               <Route path="transactions" element={<Transactions />} />
//               <Route path="settings" element={<Settings />} />
//               <Route path="help" element={<Help />} />
//               <Route
//                 path="log out"
//                 element={
//                   <Logout
//                     logoutDialog={logoutDialog}
//                     setLogoutDialog={setLogoutDialog}
//                   />
//                 }
//               />
//               <Route path="table">
//                 {superNav.map((item) => (
//                   <Route
//                     key={item}
//                     path={item}
//                     element={
//                       <SuperAdminTable screenSize={screenSize} header={item} />
//                     }
//                   />
//                 ))}
//               </Route>
//             </Route>
