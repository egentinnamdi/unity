import { Box } from "@mui/material";
import ReuseableDialog from "../components/ReuseableDialog";
import { useState } from "react";

function Logout() {
  const [open, setOpen] = useState(true);
  return (
    <Box>
      <ReuseableDialog
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
