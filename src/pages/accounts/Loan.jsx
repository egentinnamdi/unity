import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "../../ui/Header";
import { useUser } from "../../context/UserContext";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";
import Loader from "../../ui/Loader";

const labelFields = [
  { label: "account number" },
  { label: "loan amount" },
  { label: "transaction mode" },
  { label: "duration of loan" },
  { label: "purpose of loan", span: 2, multiline: true },
];
const nameFields = [
  "accountNumber",
  "loanAmount",
  "transactionMode",
  "duration",
  "purpose",
];

function Loan() {
  const contextObj = useUser();
  useEffect(
    function () {
      if (!contextObj) {
        return <Loader />;
      }
    },
    [contextObj],
  );
  const { loansFormik, isLoading } = contextObj;

  return (
    <Box className="h-full space-y-6 px-5 py-10 lg:p-10">
      <Header text="loans" />
      <form onSubmit={loansFormik.handleSubmit}>
        <Stack spacing={6} className="bg-search px-5 py-16 lg:px-10 lg:py-24">
          <Box className="grid-cols-2 grid-rows-3 gap-20 space-y-6 lg:grid lg:space-y-0">
            <LoanInputs />
          </Box>
          <Box className="flex justify-end">
            <Btn text="request loan" type="submit" isLoading={isLoading} />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function LoanInputs({ variant }) {
  const { loansFormik } = useUser();
  return (
    <>
      {nameFields.map((item, index) => (
        <Input
          required={true}
          key={item}
          formik={loansFormik}
          variant={variant}
          span={labelFields[index]?.span}
          label={labelFields[index]?.label}
          multiline={labelFields[index]?.multiline}
          name={item}
        />
      ))}
    </>
  );
}

export { LoanInputs };
export default Loan;
