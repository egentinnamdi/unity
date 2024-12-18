import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "../../ui/Header";
import NavTabs from "../../components/NavTabs";
import ReuseableDialog from "../../components/ReuseableDialog";
import {
  internalInitialVal,
  internationalInitialVal,
  otherInitialVal,
} from "../../services/formik/initialVals";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import Btn from "../../ui/buttons/Btn";
import Input from "../../ui/data-inputs/Input";
import InputSecondary from "../../ui/data-inputs/InputSecondary";
import { useSelector } from "react-redux";

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
const internalLabel = Object.keys(internalInitialVal);
const otherLabel = Object.keys(otherInitialVal);
const internationalLabel = Object.keys(internationalInitialVal);

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
  const { internalFormik, otherFormik, internationalFormik } = useUser();
  const user = useSelector((state) => state.user);

  function handlePinConfirm() {
    if (pin === user.transactionPin) {
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
    toast.success(
      "Verification complete, Please click to Transfer Funds Again",
    );
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
      <form
        onSubmit={
          !value
            ? internalFormik.handleSubmit
            : value === 1
              ? otherFormik.handleSubmit
              : internationalFormik.handleSubmit
        }
      >
        <Box className="space-y-10 bg-search p-5 lg:p-14">
          <Box className="grid-cols-2 grid-rows-2 gap-14 space-y-12 lg:grid lg:space-y-0">
            {value === 0 &&
              internal.map((item, index) => (
                <Input
                  key={`${item}-internal`}
                  formik={internalFormik}
                  inpObj={{ index, queryLabel: internalLabel, ...item }}
                />
              ))}
            {value === 1 &&
              other.map((item, index) => (
                <Input
                  key={`${item}-external`}
                  formik={otherFormik}
                  inpObj={{ index, queryLabel: otherLabel, ...item }}
                />
              ))}
            {value === 2 && <TransfersInput />}
          </Box>
          <Box className="col-start-2 flex justify-end">
            <Btn
              text="transfer funds"
              // type={taxCode && "submit"}
              type="submit"
              // setOpen={setPinDialog}
            />
          </Box>
        </Box>
      </form>
    </Stack>
  );
}

function TransfersInput({ variant }) {
  const { internationalFormik } = useUser();
  return (
    <>
      {international.map((item, index) => (
        <Input
          key={`${item}-international`}
          formik={internationalFormik}
          inpObj={{ index, queryLabel: internationalLabel, ...item }}
          variant={variant}
        />
      ))}
    </>
  );
}

export { TransfersInput };
export default Transfers;
