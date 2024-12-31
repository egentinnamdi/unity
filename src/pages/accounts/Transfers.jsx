import React from "react";
import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
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
import Cookies from "js-cookie";
import NotifDialog from "../../ui/notifications/NotifDialog";

const label = [
  "internal transfer",
  "transfer to other banks",
  "international transfer",
];
const internal = [
  { label: "sender's account number" },
  { label: "receiver's account number" },
  { label: "receiver's account name" },
  { label: "amount" },
  { label: "narration" },
];
const external = [
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
const internalNameField = Object.keys(internalInitialVal);
const externalNameField = Object.keys(otherInitialVal);
const internationalNameField = Object.keys(internationalInitialVal);

function Transfers() {
  const [transactionPin, setTransactionPin] = useState(null);
  // const [successOpen, setSuccessOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [pinDialog, setPinDialog] = useState(false);
  const [taxCodeDialog, setTaxCodeDialog] = useState(false);
  const [taxCode, setTaxCode] = useState(null);
  const { internalFormik, otherFormik, internationalFormik } = useUser();
  const user = useSelector((state) => state.user);
  const [isVerified, setIsVerified] = useState(false);
  const pin = Cookies.get("pin");

  function handlePinConfirm() {
    if (transactionPin === pin) {
      setPinDialog(false);
      setTaxCodeDialog(true);
    } else {
      toast.error("Incorrect transaction pin, please try again");
    }
  }
  function handleTaxCodeConfirm() {
    if (taxCode.length === 6 && taxCode === "101215") {
      // setTaxCode(pin);
      setTaxCodeDialog(false);
      setIsVerified(true);
      toast.success(
        "Verification complete, Please click to Transfer Funds Again",
      );
    } else {
      toast.error("Tax Code is incorrect\nPlease Contact Admin");
    }
  }

  return (
    <Stack spacing={5} className="h-full px-5 py-10 lg:p-10">
      <NotifDialog />
      <ReuseableDialog
        open={pinDialog}
        handleCancel={() => setPinDialog((prev) => !prev)}
        handleConfirm={handlePinConfirm}
        handleDialog={() => setPinDialog((prev) => !prev)}
        title="enter your transaction pin"
        action={{ textTwo: "confirm" }}
      >
        <InputSecondary
          length={4}
          transactionPin={transactionPin}
          setTransactionPin={setTransactionPin}
        />
      </ReuseableDialog>
      <ReuseableDialog
        open={taxCodeDialog}
        handleDialog={() => setTaxCodeDialog((prev) => !prev)}
        handleConfirm={handleTaxCodeConfirm}
        handleCancel={() => setTaxCodeDialog((prev) => !prev)}
        title="enter your tax code"
        action={{ textTwo: "confirm" }}
      >
        <InputSecondary
          length={6}
          transactionPin={taxCode}
          setTransactionPin={setTaxCode}
        />
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
              internalNameField.map((item, index) => {
                return (
                  item !== "type" && (
                    <Input
                      required={true}
                      label={internal[index]?.label}
                      // span={internal[index]?.span}
                      name={item}
                      key={`${item}-internal`}
                      formik={internalFormik}
                    />
                  )
                );
              })}
            {value === 1 &&
              externalNameField.map((item, index) => {
                return (
                  item !== "type" && (
                    <Input
                      required={true}
                      label={external[index]?.label}
                      // span={external[index]?.span}
                      name={item}
                      key={`${item}-external`}
                      formik={otherFormik}
                    />
                  )
                );
              })}
            {value === 2 && <TransfersInput />}
          </Box>
          <Box className="col-start-2 flex justify-end">
            {!isVerified ? (
              // <Btn text="transfer funds" setOpen={setPinDialog} />
              <Button
                onClick={() => setPinDialog(true)}
                variant="contained"
                className="w-full !rounded-3xl !bg-ui !p-4 !text-base lg:w-1/4 lg:!text-xl"
              >
                transfer funds
              </Button>
            ) : (
              <Btn text="transfer funds" type="submit" />
            )}
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
      {internationalNameField.map((item, index) => {
        return (
          item !== "type" && (
            <Input
              required={true}
              label={international[index]?.label}
              // span={international[index]?.span}
              name={item}
              key={`${item}-international`}
              formik={internationalFormik}
              variant={variant}
            />
          )
        );
      })}
    </>
  );
}

export { TransfersInput };
export default Transfers;
