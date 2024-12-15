import { Box, Stack } from "@mui/material";
import NavTabs from "../components/NavTabs";
import { useState } from "react";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import { UploadFileOutlined } from "@mui/icons-material";
import { Formik } from "formik";

const tabLabel = ["account setting", "change password"];
const inputLabel = [
  { label: "first name", span: 2 },
  { label: "last name", span: 2 },
  { label: "username", span: 2 },
  { label: "email", span: 4, type: "email" },
  { label: "gender", span: 2 },
  { label: "phone number", span: 4, type: "tel" },
  { label: "day", span: 0, type: "number" },
  { label: "month", span: 0, type: "number" },
  { label: "year", span: 0, type: "number" },
  { label: "location", span: 3 },
];
const changePass = [
  { label: "current password" },
  { label: "new password" },
  { label: "confirm password" },
];
function Settings() {
  const [value, setValue] = useState(0);
  return (
    <Box className="flex h-full flex-col space-y-6 p-5 lg:p-10">
      <NavTabs label={tabLabel} value={value} setValue={setValue} />
      <Stack spacing={6} className="rounded-md bg-search px-5 py-24 lg:px-10">
        {value === 0 ? (
          <Box className="grid-cols-6 grid-rows-4 gap-10 space-y-10 lg:grid lg:space-y-0">
            <Box className="col-span-2 flex place-items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 text-lg font-medium capitalize text-gray-400">
              <UploadFileOutlined fontSize="large" />
              <span className="pl-5">upload your photo</span>
            </Box>
            {inputLabel.map((item) => (
              <Formik>
                <Input key={item.label} inpObj={item} />
              </Formik>
            ))}
          </Box>
        ) : (
          <Stack spacing={7} className="">
            {changePass.map((item) => (
              <Input inpObj={item} />
            ))}
          </Stack>
        )}
        <Box className="justify-end lg:flex">
          <Btn text="save changes" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Settings;
