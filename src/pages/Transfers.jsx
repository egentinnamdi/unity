import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Btn from "../ui/Btn";
import Input from "../ui/Input";
import Header from "../ui/Header";
import NavTabs from "../components/NavTabs";
import ReuseableDialog from "../components/ReuseableDialog";

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
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={5} className="h-full px-5 py-10 lg:p-10">
      <ReuseableDialog
        open={open}
        setOpen={setOpen}
        title="enter your transaction pin"
        action="confirm"
      >
        hello
      </ReuseableDialog>
      <Header text="transfers" />
      <NavTabs label={label} value={value} setValue={setValue} />
      <Box className="space-y-10 bg-search p-5 lg:p-14">
        <Box className="grid-cols-2 grid-rows-2 gap-14 space-y-12 lg:grid lg:space-y-0">
          {value === 0 &&
            internal.map((item) => <Input key={item} inpObj={item} />)}
          {value === 1 &&
            other.map((item) => <Input key={item} inpObj={item} />)}
          {value === 2 &&
            international.map((item) => <Input key={item} inpObj={item} />)}
        </Box>
        <Box className="col-start-2 flex justify-end">
          <Btn text="transfer funds" setOpen={setOpen} />
        </Box>
      </Box>
    </Stack>
  );
}

export default Transfers;
