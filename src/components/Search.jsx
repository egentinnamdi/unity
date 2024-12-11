import { SearchOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

export default function Search() {
  return (
    <Box className="w-2/4 rounded-xl bg-search capitalize">
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
