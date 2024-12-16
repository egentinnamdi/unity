import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box className="flex h-screen items-center justify-center">
      <CircularProgress />
    </Box>
  );
}

export default Loader;
