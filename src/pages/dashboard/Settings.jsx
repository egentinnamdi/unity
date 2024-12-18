import { Box, Stack, TextField } from "@mui/material";
import NavTabs from "../../components/NavTabs";
import { useState } from "react";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";
import { UploadFileOutlined } from "@mui/icons-material";
import { useUser } from "../../context/UserContext";
import { userInitialVal } from "../../services/formik/initialVals";
import toast from "react-hot-toast";

const tabLabel = ["account setting", "change password"];
const inputLabel = [
  { label: "first name", span: 2 },
  { label: "last name", span: 2 },
  { label: "email", span: 4, type: "email", required: false },
  { label: "gender", span: 2, required: false },
  { label: "phone number", span: 4, type: "tel" },
  { label: "birthdate", span: 2 },
];
const queryLabel = Object.keys(userInitialVal);
const changePass = [
  { label: "current password" },
  { label: "new password" },
  { label: "confirm password" },
];
const changePassLabel = ["currentPassword", "newPassword", "confirmPassword"];

function Settings() {
  const [value, setValue] = useState(0);
  const {
    userFormik: formik,
    isLoading,
    setImage,
    changePassFormik,
  } = useUser();

  function handleChange(e) {
    console.log(e);
    setImage(e.target.files[0]);
  }

  return (
    <Box className="flex h-full flex-col space-y-6 p-5 lg:p-10">
      <NavTabs label={tabLabel} value={value} setValue={setValue} />
      <form
        onSubmit={
          value === 0 ? formik.handleSubmit : changePassFormik.handleSubmit
        }
      >
        <Stack spacing={6} className="rounded-md bg-search px-5 py-24 lg:px-10">
          {value === 0 ? (
            <Box className="grid-cols-6 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
              <Box className="col-span-2 flex place-items-center justify-center rounded-3xl border-4 border-dashed border-gray-300 text-lg font-medium capitalize text-gray-400">
                <UploadFileOutlined fontSize="large" />
                <TextField
                  // required
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
              {changePass.map((item, index) => (
                <Input
                  key={item}
                  formik={changePassFormik}
                  inpObj={{ index, queryLabel: changePassLabel, ...item }}
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
