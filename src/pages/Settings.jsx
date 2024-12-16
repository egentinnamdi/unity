import { Box, Stack, TextField } from "@mui/material";
import NavTabs from "../components/NavTabs";
import { useState } from "react";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import { UploadFileOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { useUser } from "../context/UserContext";
import { userInitialVal } from "../services/formik/initialVals";

const tabLabel = ["account setting", "change password"];
const inputLabel = [
  { label: "first name", span: 2 },
  { label: "last name", span: 2 },
  { label: "username", span: 2 },
  { label: "email", span: 4, type: "email" },
  { label: "gender", span: 2 },
  { label: "phone number", span: 4, type: "tel" },
  { label: "day", span: 0, type: "day" },
  { label: "month", span: 0 },
  { label: "year", span: 0, type: "year" },
  { label: "location", span: 3 },
];
const queryLabel = Object.keys(userInitialVal);
const changePass = [
  { label: "current password" },
  { label: "new password" },
  { label: "confirm password" },
];
function Settings() {
  const [value, setValue] = useState(0);
  const { userFormik: formik, isLoading, setImage } = useUser();

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <Box className="flex h-full flex-col space-y-6 p-5 lg:p-10">
      <NavTabs label={tabLabel} value={value} setValue={setValue} />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={6} className="rounded-md bg-search px-5 py-24 lg:px-10">
          {value === 0 ? (
            <Box className="grid-cols-6 grid-rows-4 gap-10 space-y-10 lg:grid lg:space-y-0">
              <Box className="col-span-2 flex place-items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 text-lg font-medium capitalize text-gray-400">
                <UploadFileOutlined fontSize="large" />
                <span className="pl-5 text-center">upload your photo</span>
                <TextField
                  onChange={handleChange}
                  type="file"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Box>
              {inputLabel.map((item, index) => (
                <Input
                  key={item.label}
                  formik={formik}
                  inpObj={{ index, queryLabel, ...item }}
                />
              ))}
            </Box>
          ) : (
            <Stack spacing={7} className="">
              {changePass.map((item) => (
                <Input key={item} formik={formik} inpObj={item} />
              ))}
            </Stack>
          )}
          <Box className="justify-end lg:flex">
            <Btn text="save changes" type="submit" isLoading={isLoading} />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default Settings;
