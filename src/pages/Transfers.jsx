import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Btn from "../ui/Btn";
import Input from "../ui/Input";
import Header from "../ui/Header";
import NavTabs from "../components/NavTabs";
import ReuseableDialog from "../components/ReuseableDialog";
import InputSecondary from "../ui/InputSecondary";
import { transferInitialVal } from "../services/formik/initialVals";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

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
const queryLabel = Object.keys(transferInitialVal);

const label = [
  "internal transfer",
  "transfer to other banks",
  "international transfer",
];
function Transfers() {
  const [value, setValue] = useState(0);
  const [pinDialog, setPinDialog] = useState(false);
  const [taxCodeDialog, setTaxCodeDialog] = useState(false);
  const [taxCode, setTaxCode] = useState(null);
  const {
    transactPinState: [pin, setPin],
    user,
    transferFormik: formik,
  } = useUser();

  function handlePinConfirm() {
    if (pin === user?.transactionPin) {
      setPinDialog((prev) => !prev);
      setTaxCodeDialog((prev) => !prev);
      setPin(null);
    } else {
      toast.error("Incorrect transaction pin, please try again");
    }
  }
  function handleTaxCodeConfirm() {
    setTaxCode(pin);
    setPin(null);
    setTaxCodeDialog((prev) => !prev);
  }

  return (
    <Stack spacing={5} className="h-full px-5 py-10 lg:p-10">
      <ReuseableDialog
        open={pinDialog}
        handleCancel={() => setPinDialog((prev) => !prev)}
        handleConfirm={handlePinConfirm}
        handleDialog={() => setPinDialog((prev) => !prev)}
        title="enter your transaction pin"
        action={{ textTwo: "confirm" }}
      >
        <InputSecondary length={4} />
      </ReuseableDialog>
      <ReuseableDialog
        open={taxCodeDialog}
        handleDialog={() => setTaxCodeDialog((prev) => !prev)}
        handleConfirm={handleTaxCodeConfirm}
        handleCancel={() => setTaxCodeDialog((prev) => !prev)}
        title="enter your tax code"
        action={{ textTwo: "confirm" }}
      >
        <InputSecondary length={6} />
      </ReuseableDialog>

      <Header text="transfers" />
      <NavTabs label={label} value={value} setValue={setValue} />
      <form onSubmit={formik.handleSubmit}>
        <Box className="space-y-10 bg-search p-5 lg:p-14">
          <Box className="grid-cols-2 grid-rows-2 gap-14 space-y-12 lg:grid lg:space-y-0">
            {value === 0 &&
              internal.map((item, index) => (
                <Input
                  key={item}
                  formik={formik}
                  inpObj={{ index, queryLabel, ...item }}
                />
              ))}
            {value === 1 &&
              other.map((item) => <Input key={item} inpObj={item} />)}
            {value === 2 && <TransfersInput />}
          </Box>
          <Box className="col-start-2 flex justify-end">
            <Btn text="transfer funds" setOpen={setPinDialog} />
          </Box>
        </Box>
      </form>
    </Stack>
  );
}

function TransfersInput({ variant }) {
  return (
    <>
      {international.map((item) => (
        <Input key={item} inpObj={item} variant={variant} />
      ))}
    </>
  );
}

export { TransfersInput };
export default Transfers;
