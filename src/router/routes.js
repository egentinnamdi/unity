import { lazy } from "react";
import { RouterConstantUtil } from "../utils/constants/RouterConstantUtils";
// On Boarding Pages
const LoginView = lazy(() => import("../pages/auth/LoginView"));
const RegistrationView = lazy(() => import("../pages/auth/RegistrationView"));
const ForgotPasswordView = lazy(() => import("../pages/auth/ForgotPassword"));
const PasswordResetOtp = lazy(() => import("../pages/auth/PasswordResetOtp"));
const PasswordReset = lazy(() => import("../pages/auth/PasswordReset"));

// Home Pages
const DashBoard = lazy(() => import("../pages/dashboard/Dashboard"));
const AccountBalance = lazy(() => import("../pages/dashboard/AccountBalance"));
const Transactions = lazy(() => import("../pages/dashboard/Transactions"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
const Logout = lazy(() => import("../pages/dashboard/Logout"));
const Help = lazy(() => import("../pages/dashboard/Help"));
const TransactionReceipt = lazy(() => import("../pages/TransactionReceipt"));

// Accounts Pages
const Transfers = lazy(() => import("../pages/accounts/Transfers"));
const Cards = lazy(() => import("../pages/accounts/Cards"));
const Loans = lazy(() => import("../pages/accounts/Loan"));

// Admin Pages
const TransactionsAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));
const UsersAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));
const CardsAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));
const TransfersAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));
const LoanAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));
const SupportAdmin = lazy(() => import("../pages/admin/SuperAdminTable"));

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

export const accountsRoutes = [
  {
    component: Transfers,
    path: RouterConstantUtil.subPage.transfer,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Cards,
    path: RouterConstantUtil.subPage.card,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: Loans,
    path: RouterConstantUtil.subPage.loan,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
];

export const adminRoutes = [
  {
    component: TransactionsAdmin,
    path: RouterConstantUtil.admin.transaction,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: UsersAdmin,
    path: RouterConstantUtil.admin.user,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: CardsAdmin,
    path: RouterConstantUtil.admin.card,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: TransfersAdmin,
    path: RouterConstantUtil.admin.transfer,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: LoanAdmin,
    path: RouterConstantUtil.admin.loan,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
  {
    component: SupportAdmin,
    path: RouterConstantUtil.admin.support,
    meta: {
      isAuth: false,
      redirectTo: undefined,
    },
  },
];
