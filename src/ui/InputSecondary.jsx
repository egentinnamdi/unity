import { Box, TextField } from "@mui/material";

function InputSecondary({ length }) {
  return (
    <Box className="flex w-full justify-center gap-3 px-3 lg:gap-7 lg:px-0">
      {Array.from({ length }).map((_, i) => (
        <TextField
          type="number"
          className="h-20 !w-20 !rounded-xl bg-search"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              fontSize: 30,
            },
          }}
        />
      ))}
    </Box>
  );
}

export default InputSecondary;
