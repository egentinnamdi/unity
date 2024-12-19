import { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import Preloader from "../ui/preloader";
import { AuthNavigator } from "./components/AuthNavigator";
import {
  accountsRoutes,
  adminRoutes,
  dashBoardRoutes,
  onBoardingRoutes,
} from "./routes";
import { ScrollToTop, ScrollToTopBtn } from "../ui/ScrollToTop";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from ".././AppLayout";
import { useDispatch } from "react-redux";
// import { useTheme } from "@emotion/react";
// import { useMediaQuery, useTheme } from "@mui/material";
import { updateScreenSize } from "../store/slices/miscellaneousSlice";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export const Router = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const [logoutDialog, setLogoutDialog] = useState(false);
  const screenSize = useMediaQuery(theme.breakpoints?.down("lg"));
  useEffect(
    function () {
      dispatch(updateScreenSize({ screenSize }));
    },
    [screenSize],
  );
  return (
    <>
      <div>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {/* <ScrollToTop />
          <ScrollToTopBtn /> */}

          <Suspense fallback={<Preloader />}>
            <Routes>
              {onBoardingRoutes.map((item, index) => {
                const Element = item.component;
                return (
                  <Route
                    key={index}
                    path={item.path}
                    element={<Element />}
                    // element={
                    //   <AuthNavigator
                    //     isAuth={item.meta.isAuth}
                    //     path={item.path}
                    //     elem={<Element />}
                    //   />
                    // }
                  />
                );
              })}
              <Route path="/home" element={<AppLayout />}>
                <Route index element={<Navigate to="dashboard" />} />
                {dashBoardRoutes.map((item, index) => {
                  const Element = item.component;
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={<Element />}
                      // element={
                      //   <AuthNavigator
                      //     isAuth={item.meta.isAuth}
                      //     elem={<Element />}
                      //   />
                      // }
                    />
                  );
                })}
                {accountsRoutes.map((item, index) => {
                  const Element = item.component;
                  return (
                    <Route key={index} path={item.path} element={<Element />} />
                  );
                })}
                {adminRoutes.map((item, index) => {
                  const Element = item.component;
                  return (
                    <Route
                      key={index}
                      path={`admin/${item.path}`}
                      element={<Element header={item.path} />}
                    />
                  );
                })}
              </Route>
              <Route path={"*"} element={<PageNotFound />} />
            </Routes>
          </Suspense>
          {/* <Toaster containerStyle={{ zIndex: "1000000000000000000" }} /> */}
        </BrowserRouter>
      </div>
    </>
  );
};
