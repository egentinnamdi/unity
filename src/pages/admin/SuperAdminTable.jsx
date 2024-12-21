import { Box } from "@mui/material";
import Header from "../../ui/Header";
import { useState } from "react";
import ReuseableDialog from "../../components/ReuseableDialog";
import { Add } from "@mui/icons-material";
import CustomTable from "../../components/CustomTable";
import BtnSecondary from "../../ui/buttons/BtnSecondary";
import { LoanInputs } from "../accounts/Loan";
import { HelpInputs } from "../dashboard/Help";
import { TransfersInput } from "../accounts/Transfers";
import { CardInputs } from "../accounts/Cards";
import { useQuery } from "@tanstack/react-query";
import { getSupportTable } from "../../services/api/admin";
import Cookies from "js-cookie";

const inputFields = {
  loans: <LoanInputs variant="filled" />,
  support: <HelpInputs />,
  transfers: <TransfersInput variant="filled" />,
  cards: <CardInputs variant="filled" />,
};

function SuperAdminTable({ header }) {
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const id = Cookies.get("identity");
  const token = Cookies.get("token");
  const { data, error, isLoading } = useQuery({
    queryKey: ["supportAdmin"],
    queryFn: () => getSupportTable(token, id),
  });
  if (!isLoading) {
    console.log(data);
  }
  function handleSave() {
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
        handleDialog={handleSave}
      >
        <Box className="!h-full w-full grid-cols-2 grid-rows-3 gap-10 space-y-4 p-5 lg:grid lg:space-y-0">
          {/* <LoanInputs variant="filled" /> */}
          {inputFields[header]}
        </Box>
      </ReuseableDialog>
      <ReuseableDialog
        action={{ textOne: "no", textTwo: "yes" }}
        open={deleteDialog}
        setOpen={handleDelete}
        text="Are you sure you want to delete?"
      />

      {/* Main Table Page */}
      <Box className="h-full space-y-10 px-5 py-10 lg:p-10">
        <Box className="mt-5 flex flex-col justify-between gap-y-7 text-center lg:flex-row lg:gap-y-0 lg:text-left">
          <Header text={`${header} table`} />
          <BtnSecondary onClick={handleSave} text="add new" icon={<Add />} />
        </Box>
        <CustomTable tableData={data} handleDelete={handleDelete} />
      </Box>
    </>
  );
}

export default SuperAdminTable;
