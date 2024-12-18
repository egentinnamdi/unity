import { lazy } from "react";
import { RouterConstantUtil } from "../utils/constants/RouterConstantUtils";
const LoginView = lazy(() => import("../pages/auth/LoginView"));
const RegistrationView = lazy(() => import("../pages/auth/RegistrationView"));
const ForgotPasswordView = lazy(() => import("../pages/auth/ForgotPassword"));
const PasswordResetOtp = lazy(() => import("../pages/auth/PasswordResetOtp"));
const PasswordReset = lazy(() => import("../pages/auth/PasswordReset"));
const DashBoard = lazy(() => import("../pages/dashboard/Dashboard"));
const AccountBalance = lazy(() => import("../pages/dashboard/AccountBalance"));
const Transactions = lazy(() => import("../pages/dashboard/Transactions"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
const Logout = lazy(() => import("../pages/dashboard/Logout"));
const Help = lazy(() => import("../pages/dashboard/Help"));

export const onBoardingRoutes = [
  {
    component: LoginView,
    path: RouterConstantUtil.auth.login,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: RegistrationView,
    path: RouterConstantUtil.auth.register,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: ForgotPasswordView,
    path: RouterConstantUtil.auth.forgot_password,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: PasswordResetOtp,
    path: RouterConstantUtil.auth.password_reset_otp,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: PasswordReset,
    path: RouterConstantUtil.auth.password_reset,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: LoginView,
    path: RouterConstantUtil.page.home_page,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
];

export const dashBoardRoutes = [
  {
    component: DashBoard,
    path: RouterConstantUtil.page.dashboard,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: AccountBalance,
    path: RouterConstantUtil.page.accounts,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Transactions,
    path: RouterConstantUtil.page.transactions,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Settings,
    path: RouterConstantUtil.page.settings,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Logout,
    path: RouterConstantUtil.page.logout,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Help,
    path: RouterConstantUtil.page.help,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
];
