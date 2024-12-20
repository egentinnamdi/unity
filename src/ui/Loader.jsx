import { Box } from "@mui/material";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <Box className="flex h-screen items-center justify-center">
      <HashLoader />
    </Box>
  );
}

export default Loader;
