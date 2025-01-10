import React from "react";
import { Box, Stack, TextField } from "@mui/material";
import NavTabs from "../../components/NavTabs";
import { useState } from "react";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";
import { UploadFileOutlined } from "@mui/icons-material";
import { useUser } from "../../context/UserContext";
import { userInitialVal } from "../../services/formik/initialVals";
import Loader from "../../ui/Loader";

const tabLabel = ["account setting", "change password"];
const nameFields = Object.keys(userInitialVal);
const labelFields = [
  { label: "first name", span: 2 },
  { label: "last name", span: 2 },
  { label: "email", span: 4, type: "email" },
  { label: "gender", span: 2 },
  { label: "phone number", span: 4, type: "tel" },
  { label: "birthdate", span: 2 },
];
const changePassLabelFields = [
  { label: "current password" },
  { label: "new password" },
  { label: "confirm password" },
];
const changePassNameFields = [
  "currentPassword",
  "newPassword",
  "confirmPassword",
];

function Settings() {
  const [value, setValue] = useState(0);
  const user = useUser();

  if (!user) {
    return <Loader />;
  }

  const { settingsFormik, isLoading, setImage, changePassFormik } = user;

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <Box className="flex h-full flex-col space-y-6 p-5 lg:p-10">
      <NavTabs label={tabLabel} value={value} setValue={setValue} />
      <form
        onSubmit={
          value === 0
            ? settingsFormik.handleSubmit
            : changePassFormik.handleSubmit
        }
      >
        <Stack spacing={6} className="rounded-md bg-search px-5 py-24 lg:px-10">
          {value === 0 ? (
            <Box className="grid-cols-6 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
              <Box className="col-span-2 flex place-items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 text-lg font-medium capitalize text-gray-400">
                <UploadFileOutlined fontSize="large" />
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
              {nameFields.map((item, index) => (
                <Input
                  name={item}
                  label={labelFields[index].label}
                  span={labelFields[index].span}
                  key={item}
                  formik={settingsFormik}
                />
              ))}
            </Box>
          ) : (
            <Stack spacing={7} className="">
              {changePassNameFields.map((item, index) => (
                <Input
                  required={true}
                  name={item}
                  label={changePassLabelFields[index].label}
                  key={item}
                  formik={changePassFormik}
                />
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
