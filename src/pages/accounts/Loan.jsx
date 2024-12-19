import { Box, Stack } from "@mui/material";
import Header from "../../ui/Header";
import { useUser } from "../../context/UserContext";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";

const inputFields = [
  { label: "account number" },
  { label: "loan amount" },
  { label: "transaction mode" },
  { label: "duration of loan" },
  { label: "purpose of loan", span: 2 },
];
const loanObj = [
  "accountNumber",
  "loanAmount",
  "transactionMode",
  "duration",
  "purpose",
];

function Loan() {
  const { loansFormik: formik, isLoading } = useUser();

  return (
    <Box className="h-full space-y-6 px-5 py-10 lg:p-10">
      <Header text="loans" />
      <form onSubmit={formik.handleSubmit}>
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
      {loanObj.map((item, index) => (
        <Input
          key={item}
          formik={loansFormik}
          variant={variant}
          labelAndName={item}
          inpObj={{ index, ...inputFields }}
        />
      ))}
    </>
  );
}

export { LoanInputs };
export default Loan;
