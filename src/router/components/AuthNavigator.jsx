import { useLocation } from "react-router-dom";
// import useAuth from "@/components/hooks/useAuth";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";

export const AuthNavigator = ({ isAuth: auth_required, elem }) => {
  const { pathname } = useLocation();
  const { isAuth: isUserAuthenticated } = useAuth();

  if (auth_required && !isUserAuthenticated) {
    // uncomment the below line

    location.href = RouterConstantUtil.auth.login;
  }

  if (pathname.includes("login")) {
    // uncomment the below line
    // isUserAuthenticated
    //   ? (location.href = RouterConstantUtil.admin.home)
    //   : null;
  }

  return elem;
};
