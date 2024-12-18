import { Box, TextField } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

function Input({ inpObj, variant = "outlined", formik }) {
  const { isLoading, user } = useUser();
  const {
    label = "TBD",
    span = 0,
    type = "text",
    index,
    queryLabel,
    multiline,
  } = inpObj;

  // Multiline Inputs
  let multi;
  if (multiline) {
    multi = { multiline, maxRows: 2 };
  }

  return (
    <Box
      className={`flex-grow !rounded-lg ${variant === "outlined" && "border"} border-gray-300 !bg-white lg:p-2`}
      sx={{
        gridColumn: `span ${span}`,
      }}
    >
      {label === "birthdate" ? (
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            value={formik?.values[queryLabel[index]]}
            name={queryLabel && queryLabel[index]}
            onChange={(value) => formik.setFieldValue("birthdate", value)}
            onBlur={formik?.handleBlur}
            className="w-full capitalize"
            label={label}
            maxDate={new Date()}
            slotProps={{
              textField: {
                variant: "outlined",
              },
            }}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          disabled={isLoading}
          name={queryLabel && queryLabel[index]}
          // value={user[queryLabel[index]]}
          {...multi}
          label={label}
          type={type}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
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
      )}
    </Box>
  );
}

export default Input;
