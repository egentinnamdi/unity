import { Box } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ReuseableDialog from "../../components/ReuseableDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";

function Logout({ logoutDialog, setLogoutDialog }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
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
