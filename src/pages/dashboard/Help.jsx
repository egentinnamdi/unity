import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Header from "../../ui/Header";
import Input from "../../ui/data-inputs/Input";
import { useUser } from "../../context/UserContext";
import { supportInitialVal } from "../../services/formik/initialVals";
import Btn from "../../ui/buttons/Btn";
import Loader from "../../ui/Loader";

const labelFields = [
  { label: "first name" },
  { label: " last name" },
  { label: "email" },
  { label: "phone number" },
  { label: "priority", span: 2, options: ["low", "medium", "high"] },
  { label: "message", span: 2, multiline: true },
];

const nameFields = Object.keys(supportInitialVal);
function Help() {
  const contextObj = useUser();
  if (!contextObj) {
    return <Loader />;
  }

  const { supportFormik } = contextObj;
  return (
    <Box className="flex h-full flex-col space-y-7 px-5 py-10 lg:p-10">
      <Header text="help desk" />
      <Typography variant="h4" className="!text-xl text-gray-300 lg:!text-4xl">
        Say something to start a live chart!
      </Typography>
      <form onSubmit={supportFormik.handleSubmit}>
        <Stack spacing={6} className="lg:px-10 lg:py-16">
          <Box className="grid-cols-2 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
            <HelpInputs supportFormik={supportFormik} />
          </Box>
          <Box className="flex justify-end">
            <Btn text="send message" type="submit" />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function HelpInputs({ supportFormik }) {
  return (
    <>
      {nameFields.map((item, index) => (
        <Input
          required={true}
          name={item}
          key={item}
          label={labelFields[index]?.label}
          span={labelFields[index]?.span}
          multiline={labelFields[index]?.multiline}
          formik={supportFormik}
          variant="filled"
          options={labelFields[index]?.options}
        />
      ))}
    </>
  );
}

export { HelpInputs };
export default Help;
