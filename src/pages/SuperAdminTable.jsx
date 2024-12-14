import { Box } from "@mui/material";
import Header from "../ui/Header";
import BtnSecondary from "../ui/BtnSecondary";
import TransactionTable from "../components/TransactionTable";
import { useState } from "react";
import ReuseableDialog from "../components/ReuseableDialog";
import Input from "../ui/Input";
import { Add, Spa } from "@mui/icons-material";
import CustomTable from "../components/CustomTable";

const transTabDetails = [
  { label: "sender's account number" },
  { label: "receiver's account number" },
  { label: "receiver's account name" },
  { label: "amount" },
  { label: "narration", span: 2 },
];

function SuperAdminTable({ header }) {
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  function handleClick() {
    setSaveDialog((prev) => !prev);
  }
  function handleDelete(closeMenu) {
    setDeleteDialog((prev) => !prev);
    closeMenu();
  }
  return (
    <>
      {/* Dialog Box  */}
      <ReuseableDialog
        action={{ textOne: "cancel", textTwo: "save" }}
        open={saveDialog}
        setOpen={setSaveDialog}
      >
        <Box className="!h-full w-full grid-cols-2 grid-rows-3 gap-10 space-y-4 p-5 lg:grid lg:space-y-0">
          {transTabDetails.map((item) => (
            <Input inpObj={item} key={item} />
          ))}
        </Box>
      </ReuseableDialog>
      <ReuseableDialog
        action={{ textOne: "no", textTwo: "yes" }}
        open={deleteDialog}
        setOpen={setDeleteDialog}
        text="Are you sure you want to delete?"
      />

      {/* Main Table Page */}
      <Box className="h-full space-y-10 px-5 py-10 lg:p-10">
        <Box className="mt-5 flex flex-col justify-between gap-y-7 lg:flex-row lg:gap-y-0">
          <Header text={`${header} table`} />
          <BtnSecondary onClick={handleClick} text="add new" icon={<Add />} />
        </Box>
        <CustomTable handleDelete={handleDelete} />
      </Box>
    </>
  );
}

export default SuperAdminTable;