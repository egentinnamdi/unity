import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { deleteTransactRow, getCardsTable } from "../../services/api/admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
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
import BtnSecondary from "../../ui/buttons/BtnSecondary";
import { populateCards } from "../../store/slices/adminSlice";
import {
  resetPage,
  updateGlobalLoadingStatus,
} from "../../store/slices/miscellaneousSlice";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import InputsAdmin from "../../ui/data-inputs/InputsAdmin";
import TablePagination from "../../components/TablePagination";
const tableHead = [
  "created at",
  "card name",
  "card type",
  "card number",
  "expiry year",
  "status",
  "action",
];
const initialValues = {
  cardName: "",
  cardIssuer: "",
  cardType: "",
  status: "",
  cardNumber: "",
  expiryYear: "",
  cvv: "",
};
function CardsAdmin() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const { cardsTable } = useSelector((state) => state.admin);
  const { next, previous } = useSelector((state) => state.others);

  //   Fetch Users Admin Table
  const { data, isLoading } = useQuery({
    queryKey: ["cardsAdmin"],
    queryFn: () => getCardsTable(token),
  });

  //   Delete Row
  const { mutate } = useMutation({
    mutationFn: deleteTransactRow,
    onSuccess: () => {
      toast.success("Row deleted Successfully");
      queryClient.invalidateQueries("cardsAdmin");
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
        dispatch(populateCards({ cards: data }));
      }
    },
    [isLoading, data, dispatch],
  );

  function handleDelete() {
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    setDeleteDialog(false);
    mutate({ token, id: cardsTable[rowIndex].id, endpoint: "cards" });
  }
  function handleClick(event, index) {
    setRowIndex(index);
    setMenuOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }
  return (
    <>
      <ReuseableDialog
        open={saveDialog}
        handleDialog={() => setSaveDialog(false)}
        handleCancel={() => setSaveDialog(false)}
      >
        <InputsAdmin
          id={cardsTable[rowIndex]?.id}
          setSaveDialog={setSaveDialog}
          initialValues={initialValues}
          queryKey="cardsAdmin"
          path="cards"
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
          <Header text="cards table" />
          <BtnSecondary
            onClick={() => {
              setIsPost(true);
              setSaveDialog(true);
            }}
            text="add new"
            icon={<Add />}
          />
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
              setMenuOpen(false);
              setSaveDialog(true);
              setIsPost(false);
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
              {cardsTable?.map((item, index) => {
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
                        {item?.cardName || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.cardType || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.cardNumber || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                        {item?.expiryYear || "loading..."}
                      </TableCell>
                      <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
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
        <TablePagination data={cardsTable} />
      </Box>
    </>
  );
}

export default CardsAdmin;
