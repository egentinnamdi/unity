import React from "react";
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
import { useEffect, useState } from "react";
import ReuseableDialog from "../../components/ReuseableDialog";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
// import BtnSecondary from "../../ui/buttons/BtnSecondary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransactRow, getTransfersTable } from "../../services/api/admin";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPage,
  updateGlobalLoadingStatus,
} from "../../store/slices/miscellaneousSlice";
import toast from "react-hot-toast";
import { populateTransfers } from "../../store/slices/adminSlice";
import InputsAdmin from "../../ui/data-inputs/InputsAdmin";
import TablePagination from "../../components/TablePagination";

const tableHead = [
  "created at",
  "sender's account",
  "receiver's account",
  "receiver's name",
  "amount",
  "type",
  "action",
];
const initialValues = {
  senderAccountNumber: "",
  receiverAccountNumber: "",
  receiverAccountName: "",
  receiverBankName: "",
  narration: "",
  amount: "",
  routingNumber: "",
  type: "",
};
function TransfersAdmin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const token = Cookies.get("token");
  const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { next, previous } = useSelector((state) => state.others);

  const { transfersTable } = useSelector((state) => state.admin);

  // Get Transactions
  const { data, isLoading } = useQuery({
    queryKey: ["transfersAdmin"],
    queryFn: () => getTransfersTable(token),
  });

  // Delete Transaction Row
  const { mutate } = useMutation({
    mutationFn: deleteTransactRow,
    onSuccess: () => {
      toast.success("Row deleted Successfully");
      queryClient.invalidateQueries("transfersAdmin");
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
        dispatch(populateTransfers({ transfers: data }));
      }
    },
    [isLoading, data, dispatch],
  );

  function handleDelete() {
    setDeleteDialog(false);
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    mutate({
      token,
      id: transfersTable[rowIndex].id,
      endpoint: `transfers/${isPost ? "" : "admin"}`,
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
          id={transfersTable[rowIndex]?.id}
          setSaveDialog={setSaveDialog}
          initialValues={initialValues}
          queryKey="transfersAdmin"
          path="transfers/admin"
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
          <Header text="transfers table" />
          {/* <BtnSecondary
            onClick={() => {
              setIsPost(true);
              setSaveDialog(true);
            }}
            text="add new"
            icon={<Add />}
          /> */}
        </Box>
        <Menu
          open={menuOpen}
          onClose={handleClick}
          anchorEl={anchor}
          className="capitalize"
          classes={{ paper: "p-2 !rounded-xl" }}
        >
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
              <TableRow className="grid-cols-7 bg-search py-3 lg:!grid">
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
              {transfersTable?.map((item, index) => {
                return (
                  index >= previous &&
                  index < next && (
                    <TableRow
                      key={index}
                      className="!duration-400 grid-cols-7 rounded-2xl py-2 transition-all ease-in-out hover:bg-gray-300 lg:!grid lg:bg-gray-100"
                    >
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {new Date(item?.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.senderAccountNumber || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.receiverAccountNumber || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.receiverAccountName || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.amount || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.type || "loading..."}
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
        <TablePagination data={transfersTable} />
      </Box>
    </>
  );
}

export default TransfersAdmin;
