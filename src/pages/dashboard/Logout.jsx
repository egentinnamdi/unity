import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReuseableDialog from "../../components/ReuseableDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import Cookies from "js-cookie";

function Logout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("pin");
    dispatch(logout());
    setOpen(false);
    navigate(`${RouterConstantUtil.auth.login}`);
  }
  function handleCancel() {
    setOpen(false);
    navigate(`/home/${RouterConstantUtil.page.dashboard}`);
  }
  function handleDialog() {
    setOpen(false);
    navigate(`/home/${RouterConstantUtil.page.dashboard}`);
  }
  return (
    <Box>
      <ReuseableDialog
        handleConfirm={handleLogout}
        handleCancel={handleCancel}
        handleDialog={handleDialog}
        open={open}
        setOpen={setOpen}
        action={{
          textOne: "cancel",
          textTwo: "confirm",
        }}
        text="Are you sure you want to log out?"
      />
    </Box>
  );
}

export default Logout;
