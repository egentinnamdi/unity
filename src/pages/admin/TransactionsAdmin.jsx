import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReuseableDialog from "../../components/ReuseableDialog";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "../../ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  resetPage,
  updateGlobalLoadingStatus,
} from "../../store/slices/miscellaneousSlice";
import { populateTransactions } from "../../store/slices/adminSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  deleteTransactRow,
  getTransactionsAdmin,
} from "../../services/api/admin";
import BtnSecondary from "../../ui/buttons/BtnSecondary";
import InputsAdmin from "../../ui/data-inputs/InputsAdmin";
import TablePagination from "../../components/TablePagination";
import ViewReceipt from "../../components/ViewReceipt";

const tableHead = [
  "created date",
  "amount",
  "type",
  "mode",
  "status",
  "action",
];
const initialValues = {
  createdAt: null,
  senderAccountNumber: "",
  receiverAccountNumber: "",
  receiverAccountName: "",
  narration: "",
  amount: "",
  type: "",
  // type: "",
};
function TransactionsAdmin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [saveDialog, setSaveDialog] = useState(false);
  const { next, previous } = useSelector((state) => state.others);

  const token = Cookies.get("token");
  const { transactionsTable } = useSelector((state) => state.admin);

  const { data, isLoading } = useQuery({
    queryKey: ["transactionAdmin"],
    queryFn: () => getTransactionsAdmin(token),
  });

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
      dispatch(resetPage());
      dispatch(updateGlobalLoadingStatus({ loading: isLoading }));
      if (!isLoading) {
        dispatch(populateTransactions({ transactions: data }));
      }
    },
    [isLoading, dispatch, data],
  );

  function handleDelete() {
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    setDeleteDialog(false);
    mutate({
      token,
      id: transactionsTable[rowIndex].id,
      endpoint: "transactions",
    });
  }
  function handleClick(event, index) {
    setRowIndex(index);
    setMenuOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }
  return (
    <>
      {/* Dialog Box  */}
      <ReuseableDialog
        open={saveDialog}
        handleDialog={() => setSaveDialog(false)}
        handleCancel={() => setSaveDialog(false)}
      >
        <InputsAdmin
          id={transactionsTable[rowIndex]?.id}
          setSaveDialog={setSaveDialog}
          initialValues={initialValues}
          queryKey="transactionAdmin"
          path="transactions/admin"
          isPost={isPost}
        />
      </ReuseableDialog>
      <ReuseableDialog
        action={{ textOne: "no", textTwo: "yes" }}
        open={deleteDialog}
        handleDialog={() => setDeleteDialog(false)}
        handleConfirm={handleDelete}
        handleCancel={() => setDeleteDialog(false)}
        text="Are you sure you want to delete?"
      />

      {/* Main Table Page */}
      <Box className="h-full space-y-10 px-5 py-10 lg:p-10">
        <Box className="mt-5 flex flex-col justify-between gap-y-7 text-center lg:flex-row lg:gap-y-0 lg:text-left">
          <Header text="transactions table" />
          <BtnSecondary
            onClick={() => {
              setIsPost(true);
              setSaveDialog(true);
            }}
            text="add new"
            icon={<Add />}
          />
        </Box>

        {/* Menu For Delete and edit */}
        <Menu
          open={menuOpen}
          onClose={handleClick}
          anchorEl={anchor}
          className="capitalize"
          classes={{ paper: "p-2 !rounded-xl" }}
        >
          <ViewReceipt id={rowIndex} role="admin" />
          <MenuItem
            className="!font-medium !text-superNav"
            onClick={() => {
              setIsPost(false);
              setMenuOpen(false);
              setSaveDialog(true);
            }}
          >
            <Edit />
            <span>edit</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              setDeleteDialog(true);
            }}
            className="!font-medium !text-pink-400"
          >
            <Delete />
            <span>delete</span>
          </MenuItem>
        </Menu>
        {/* Table  */}
        <TableContainer>
          <Table stickyHeader className="space-y-6 capitalize">
            {/* Table Head */}
            <TableHead className="lg:!block">
              <TableRow className="grid-cols-6 bg-search py-3 lg:!grid">
                {tableHead.map((item) => (
                  <TableCell
                    className="!bg-inherit !text-sm !text-gray-500 lg:!border-none lg:!text-lg"
                    key={item}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody className="space-y-6 lg:!block">
              {transactionsTable?.map((item, index) => {
                return (
                  index >= previous &&
                  index < next && (
                    <TableRow
                      key={index}
                      className="!duration-400 grid-cols-6 rounded-2xl py-2 transition-all ease-in-out hover:bg-gray-200 lg:!grid lg:bg-gray-100"
                    >
                      <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {new Date(item?.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.amount || "loading..."}
                      </TableCell>
                      <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.type || "loading..."}
                      </TableCell>
                      <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.mode || "loading..."}
                      </TableCell>
                      <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.status || "loading..."}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(event) => handleClick(event, index)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination data={transactionsTable} />
      </Box>
    </>
  );
}

export default TransactionsAdmin;
