import { SearchOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

export default function Search() {
  return (
    <Box className="w-11/12 rounded-3xl bg-search capitalize lg:w-2/4 lg:rounded-xl">
      <TextField
        label="search"
        className="w-full"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-notchedOutline:focus": {
            border: "none",
          },
        }}
      />
    </Box>
  );
}
