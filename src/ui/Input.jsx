import { Box, TextField } from "@mui/material";

function Input({ inpObj, variant = "outlined" }) {
  const { label = "TBD", span = 0, type = "text" } = inpObj;
  return (
    <Box
      className={`flex-grow !rounded-lg ${variant === "outlined" && "border"} border-gray-300 !bg-white lg:p-2`}
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
          "& .MuiInputBase-root.MuiFilledInput-root": {
            backgroundColor: "white",
          },
        }}
      />
    </Box>
  );
}

export default Input;
