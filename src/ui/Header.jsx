import React from "react";
import { Box, Typography } from "@mui/material";

function Header({ text }) {
  return (
    // <Box className="pt-5">
    <Box className="">
      <Typography
        className="!text-3xl !font-medium capitalize lg:!text-5xl"
        variant="h3"
        component="h1"
      >
        {text}
      </Typography>
    </Box>
  );
}

export default Header;
