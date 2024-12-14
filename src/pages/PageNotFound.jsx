import { Box, Typography } from "@mui/material";

function PageNotFound() {
  return (
    <Box className="grid h-screen place-items-center bg-primary">
      <Typography className="text-center !text-5xl !font-medium uppercase text-white">
        page not found
      </Typography>
    </Box>
  );
}

export default PageNotFound;
