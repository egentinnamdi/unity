import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Btn from "../ui/Btn";
import Input from "../ui/Input";
import Header from "../ui/Header";
import NavTabs from "../components/NavTabs";

const internal = [
  { label: "sender's account number" },
  { label: "receiver's account number" },
  { label: "receiver's account name" },
  { label: "amount" },
  { label: "narration" },
];
const other = [
  { label: "sender's account number" },
  { label: "receiver's account number" },
  { label: "receiver's account name" },
  { label: "receiver's bank name" },
  { label: "amount" },
  { label: "narration" },
];
const international = [
  { label: "sender's account number" },
  { label: "receiver's account number" },
  { label: "receiver's account name" },
  { label: "receiver's bank name" },
  { label: "swift/aba routing number" },
  { label: "amount" },
  { label: "narration" },
];

const label = [
  "internal transfer",
  "transfer to other banks",
  "international transfer",
];
function Transfers() {
  const [value, setValue] = useState(0);

  return (
    <Stack spacing={5} className="h-full p-5">
      <Header text="transfers" />
      <NavTabs label={label} value={value} setValue={setValue} />
      <Box className="space-y-10 bg-search p-14">
        <Box className="grid grid-cols-2 grid-rows-2 gap-12">
          {value === 0 &&
            internal.map((item) => <Input key={item} inpObj={item} />)}
          {value === 1 &&
            other.map((item) => <Input key={item} inpObj={item} />)}
          {value === 2 &&
            international.map((item) => <Input key={item} inpObj={item} />)}
        </Box>
        <Box className="col-start-2 flex justify-end">
          <Btn text="transfer funds" />
        </Box>
      </Box>
    </Stack>
  );
}

export default Transfers;
