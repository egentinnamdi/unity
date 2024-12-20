import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import { useEffect } from "react";

function Authorization({ children }) {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(function () {
    if (!token) {
      navigate(RouterConstantUtil.auth.login);
    }
  }, []);
  return <>{children};</>;
}

export default Authorization;
