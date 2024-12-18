import { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import Preloader from "../ui/preloader";
import { AuthNavigator } from "./components/AuthNavigator";
import { dashBoardRoutes, onBoardingRoutes } from "./routes";
import { ScrollToTop, ScrollToTopBtn } from "../ui/ScrollToTop";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from ".././AppLayout";
// import { useSelector } from "react-redux";
// import { handleLoggingOutState } from "../utils/helpers";
// import useAuth from "@/components/hooks/useAuth";
// import { UserService } from "@/services/api/users";
// import useSWR from "swr";
// import { useDispatch } from "react-redux";
// import { updateUserData } from "@/services/store/slices/authSlice";

export const Router = () => {
  // const isLoggingOut = useSelector((state) => state.auth.logginOut);

  // const { isAuth } = useAuth();

  // const fetcher = (url: string) => UserService.getUserDetails(url);

  // const { data: userData } = useSWR(isAuth ? "users" : null, fetcher);

  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   if (userData?.data?.user) {
  //     dispatch(updateUserData(userData.data.user));
  //   }
  // }, [userData, dispatch]);

  // useEffect(() => {
  //   handleLoggingOutState(isLoggingOut);
  // }, [isLoggingOut]);

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
                <Route index element={<Navigate to="accounts" />} />
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
