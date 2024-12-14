import { SearchOutlined } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

export default function Search({ screenSize }) {
  return (
    <Box className="w-11/12 rounded-3xl bg-search capitalize lg:w-2/4 lg:rounded-xl">
      <TextField
        label="search"
        className="flex w-full"
        classes={{
          input: "!w-2 !bg-red-100",
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          // "& .MuiOutlinedInput-input": {
          //   height: screenSize ? 10 : null,
          // },

          "& .MuiOutlinedInput-notchedOutline:focus": {
            border: "none",
          },
        }}
      />
    </Box>
  );
}
