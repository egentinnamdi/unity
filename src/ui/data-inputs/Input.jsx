import { Box, TextField } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useSelector } from "react-redux";

function Input({ inpObj, labelAndName = "TBD", variant = "outlined", formik }) {
  // const { isLoading, user } = useUser();
  const user = useSelector((state) => state.user);
  const { index } = inpObj;
  // const { multiline, type = "text" } = inpObj[index];
  console.log(inpObj[index]);
  // Multiline Inputs
  // let multi;
  // if (multiline) {
  //   multi = { multiline, maxRows: 2 };
  // }

  return (
    <Box
      className={`flex-grow !rounded-lg ${variant === "outlined" && "border"} border-gray-300 !bg-white lg:p-2`}
      sx={{
        gridColumn: `span ${1}`,
      }}
    >
      {labelAndName === "birthdate" ? (
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
          <DatePicker
            value={formik?.values[labelAndName]}
            name={labelAndName}
            onChange={(value) => formik.setFieldValue("birthdate", value)}
            onBlur={formik?.handleBlur}
            className="w-full capitalize"
            label={labelAndName}
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
          disabled={user.isLoading}
          name={labelAndName}
          value={formik.values[labelAndName]}
          // {...multi}
          label={labelAndName}
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
