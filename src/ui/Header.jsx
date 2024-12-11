import { Box, Typography } from "@mui/material";

function Header({ text }) {
  return (
    <Box className="pt-5">
      <Typography
        className="!font-medium capitalize"
        variant="h3"
        component="h1"
      >
        {text}
      </Typography>
    </Box>
  );
}

export default Header;
