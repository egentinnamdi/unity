import { Box, Stack } from "@mui/material";
import Header from "../ui/Header";
import Btn from "../ui/Btn";
import Input from "../ui/Input";

const loanObj = [
  { label: "account number" },
  { label: "loan amount" },
  { label: "transaction mode" },
  { label: "duration of loan" },
  { label: "purpose of loan", span: 2 },
];

function Loan() {
  return (
    <Box className="h-full space-y-6 px-5 py-10 lg:p-10">
      <Header text="loans" />
      <Stack spacing={6} className="bg-search px-5 py-16 lg:px-10 lg:py-24">
        <Box className="grid-cols-2 grid-rows-3 gap-20 space-y-6 lg:grid lg:space-y-0">
          {loanObj.map((item) => (
            <Input key={item.label} inpObj={item} />
          ))}
        </Box>
        <Box className="flex justify-end">
          <Btn text="request loan" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Loan;
