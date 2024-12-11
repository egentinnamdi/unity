import { Box, TextField } from "@mui/material";
import { colors } from "../utils/config";

function Input({ inpObj }) {
  const {
    label = "TBD",
    span = 0,
    type = "text",
    variant = "outlined",
  } = inpObj;
  return (
    <Box
      className={`flex-grow !rounded-lg border border-gray-300 !bg-white lg:p-2`}
      sx={{
        gridColumn: `span ${span}`,
      }}
    >
      <TextField
        label={label}
        type={type}
        variant={variant}
        className="w-full !rounded-lg capitalize !text-ui"
        classes={{
          root: "!text-ui ",
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          // "& .MuiInputBase-root.MuiFilledInout-root": {
          //   backgroundColor: "red",
          // },
          //   "&:focus .MuiOutlinedInput-notchedOutline": {
          //     borderColor: "red",
          //   },
        }}
      />
    </Box>
  );
}

export default Input;
