import React from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import SelectField from "./SelectField";

function Input({
  span,
  name,
  label = "TBD",
  variant = "outlined",
  formik,
  multiline = false,
  options,
  required = false,
}) {
  // const user = useSelector((state) => state.user);

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
            label={label}
            value={formik?.values[name]}
            name={name}
            onChange={(value) => formik.setFieldValue("birthdate", value)}
            onBlur={formik?.handleBlur}
            className="w-full capitalize"
            maxDate={new Date()}
            slotProps={{
              textField: {
                variant: "outlined",
                required: required,
              },
            }}
          />
        </LocalizationProvider>
      ) : options ? (
        <SelectField
          required={required}
          name={name}
          label={label}
          formik={formik}
          options={options}
          variant={variant}
        />
      ) : (
        <TextField
          required={required}
          name={name}
          value={formik?.values[name]}
          {...multi}
          label={label}
          type="text"
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
