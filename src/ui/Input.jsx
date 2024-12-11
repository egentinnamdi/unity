import { Box, TextField } from "@mui/material";
import { colors } from "../utils/config";

function Input({ inpObj }) {
  const { label = "TBD", span = 0, type = "text" } = inpObj;
  return (
    <Box
      className={`!rounded-lg border border-gray-300`}
      sx={{
        gridColumn: `span ${span}`,
      }}
    >
      <TextField
        label={label}
        type={type}
        variant="outlined"
        className="w-full !rounded-lg bg-white capitalize !text-ui"
        classes={{
          root: "!text-ui",
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          //   "&:focus .MuiOutlinedInput-notchedOutline": {
          //     borderColor: "red",
          //   },
        }}
      />
    </Box>
  );
}

export default Input;
