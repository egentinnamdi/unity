import { Box } from "@mui/material";
import Header from "../../ui/Header";
import { useEffect, useState } from "react";
import ReuseableDialog from "../../components/ReuseableDialog";
import { Add } from "@mui/icons-material";
import CustomTable from "../../components/CustomTable";
import BtnSecondary from "../../ui/buttons/BtnSecondary";
import { LoanInputs } from "../accounts/Loan";
import { HelpInputs } from "../dashboard/Help";
import { TransfersInput } from "../accounts/Transfers";
import { CardInputs } from "../accounts/Cards";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteTransactRow,
  getSupportTable,
  getTransactionsAdmin,
} from "../../services/api/admin";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateGlobalLoadingStatus } from "../../store/slices/miscellaneousSlice";
import { loading } from "../../store/slices/userSlice";
import toast from "react-hot-toast";
import { populateTransactions } from "../../store/slices/adminSlice";

const inputFields = {
  loans: <LoanInputs variant="filled" />,
  support: <HelpInputs />,
  transfers: <TransfersInput variant="filled" />,
  cards: <CardInputs variant="filled" />,
};

function SuperAdminTable({ header }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [saveDialog, setSaveDialog] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  // const id = Cookies.get("identity");
  const token = Cookies.get("token");
  const { transactionsTable } = useSelector((state) => state.admin);

  // Get Transactions
  const { data, error, isLoading } = useQuery({
    queryKey: ["transactionAdmin"],
    queryFn: () => getTransactionsAdmin(token),
  });

  // const adminTables = useQueries([
  //   {
  //     queryKey: "transactionAdmin",
  //     queryFn: () => getTransactionsAdmin(token),
  //   },
  //   {
  //     queryKey: "supportAdmin",
  //     queryFn: () => getSupportTable(token),
  //   },
  //   {
  //     queryKey: "transactionAdmin",
  //     queryFn: () => getTransactionsAdmin(token),
  //   },
  //   {
  //     queryKey: "transactionAdmin",
  //     queryFn: () => getTransactionsAdmin(token),
  //   },
  //   {
  //     queryKey: "transactionAdmin",
  //     queryFn: () => getTransactionsAdmin(token),
  //   },
  // ]);

  // Delete Transaction Row
  const { mutate } = useMutation({
    mutationFn: deleteTransactRow,
    onSuccess: () => {
      toast.success("Row deleted Successfully");
      queryClient.invalidateQueries("transactionAdmin");
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => dispatch(updateGlobalLoadingStatus({ loading: false })),
  });

  // Save Transaction Data to store
  useEffect(
    function () {
      dispatch(updateGlobalLoadingStatus({ loading: isLoading }));
      if (!isLoading) {
        dispatch(populateTransactions({ transactions: data }));
      }
    },
    [isLoading],
  );

  function handleSave() {
    setSaveDialog((prev) => !prev);
  }
  function handleDelete(closeMenu) {
    setDeleteDialog(false);
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    mutate({ token, id: transactionsTable[+rowIndex].id });
    closeMenu();
  }
  return (
    <>
      {/* Dialog Box  */}
      <ReuseableDialog
        action={{ textOne: "cancel", textTwo: "save" }}
        open={saveDialog}
        handleDialog={handleSave}
        handleCancel={() => setSaveDialog(false)}
      >
        <Box className="!h-full w-full grid-cols-2 grid-rows-3 gap-10 space-y-4 p-5 lg:grid lg:space-y-0">
          {/* <LoanInputs variant="filled" /> */}
          {inputFields[header]}
        </Box>
      </ReuseableDialog>
      <ReuseableDialog
        action={{ textOne: "no", textTwo: "yes" }}
        open={deleteDialog}
        handleDialog={handleDelete}
        handleCancel={() => setDeleteDialog(false)}
        text="Are you sure you want to delete?"
      />

      {/* Main Table Page */}
      <Box className="h-full space-y-10 px-5 py-10 lg:p-10">
        <Box className="mt-5 flex flex-col justify-between gap-y-7 text-center lg:flex-row lg:gap-y-0 lg:text-left">
          <Header text={`${header} table`} />
          <BtnSecondary onClick={handleSave} text="add new" icon={<Add />} />
        </Box>
        <CustomTable
          tableData={data}
          handleDelete={handleDelete}
          setRowIndex={setRowIndex}
        />
      </Box>
    </>
  );
}

export default SuperAdminTable;
