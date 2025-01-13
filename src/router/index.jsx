import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  accountsRoutes,
  adminRoutes,
  dashBoardRoutes,
  onBoardingRoutes,
} from "./routes";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from ".././AppLayout";
import TransactionReceipt from "../pages/TransactionReceipt";
import { BounceLoader } from "react-spinners";
import { Box } from "@mui/material";

export const Router = () => {
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

          <Suspense
            fallback={
              <Box className="grid h-screen w-screen place-items-center bg-gray-400">
                <BounceLoader className="backdrop-blur-lg" />
              </Box>
            }
          >
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
                      element={
                        <Suspense
                          fallback={
                            <Box className="grid h-screen place-items-center bg-gray-100">
                              <BounceLoader className="backdrop-blur-lg" />
                            </Box>
                          }
                        >
                          <Element />
                        </Suspense>
                      }
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
                    <Route
                      key={index}
                      path={item.path}
                      element={
                        <Suspense
                          fallback={
                            <Box className="grid h-screen place-items-center bg-gray-100">
                              <BounceLoader className="backdrop-blur-lg" />
                            </Box>
                          }
                        >
                          <Element />
                        </Suspense>
                      }
                    />
                  );
                })}
                {adminRoutes.map((item, index) => {
                  const Element = item.component;
                  return (
                    <Route
                      key={index}
                      path={`admin/${item.path}`}
                      element={
                        <Suspense
                          fallback={
                            <Box className="grid h-screen place-items-center bg-gray-100">
                              <BounceLoader className="backdrop-blur-lg" />
                            </Box>
                          }
                        >
                          <Element />
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
              <Route
                path={"/transaction-receipt/:role/:id"}
                element={<TransactionReceipt />}
              />
              <Route path={"*"} element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </>
  );
};
