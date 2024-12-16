import { Box } from "@mui/material";
import ReuseableDialog from "../components/ReuseableDialog";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Logout({ logoutDialog, setLogoutDialog }) {
  const [open, setOpen] = useState(true);
  const { setToken } = useUser();
  const navigate = useNavigate();
  function handleLogout() {
    setToken(null);
    setLogoutDialog((prev) => !prev);
    navigate("/dashboard");
  }
  function handleCancel() {
    setToken((prev) => prev);
    setLogoutDialog((prev) => !prev);
    navigate("/dashboard");
  }
  function handleDialog() {
    setLogoutDialog((prev) => !prev);
    navigate("/dashboard");
  }
  return (
    <Box>
      <ReuseableDialog
        handleConfirm={handleLogout}
        handleCancel={handleCancel}
        handleDialog={handleDialog}
        open={logoutDialog}
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
