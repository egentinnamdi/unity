import { Box, TextField, Typography } from "@mui/material";
import Header from "../ui/Header";

function Help() {
  return (
    <Box className="flex h-full flex-col space-y-7 p-10">
      <Box className="space-y-5">
        <Header text="help desk" />
        <Typography variant="h4" className="text-gray-300">
          Say something to start a live chart!
        </Typography>
      </Box>
      <Box className="flex-grow grid-cols-2 grid-rows-3 bg-green-200 lg:grid">
        <TextField variant="filled" label="name" />
        <TextField variant="filled" label="name" />
        <TextField variant="filled" label="name" />
        <TextField variant="filled" label="name" />
        <TextField variant="filled" label="name" />
      </Box>
    </Box>
  );
}

export default Help;
