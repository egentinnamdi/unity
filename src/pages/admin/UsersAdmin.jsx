import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Cookies from "js-cookie";
import { deleteTransactRow, getUsersTable } from "../../services/api/admin";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { populateUsers } from "../../store/slices/adminSlice";
import { updateGlobalLoadingStatus } from "../../store/slices/miscellaneousSlice";
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
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import InputsAdmin from "../../ui/data-inputs/InputsAdmin";

const tableHead = [
  "account number",
  "first name",
  "phone",
  "email",
  "username",
  "action",
];
const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  profilePicture: "",
  transactionPin: "",
  username: "",
  birthdate: null,
};
function UsersAdmin() {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [saveDialog, setSaveDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);
  const { usersTable } = useSelector((state) => state.admin);

  const { data, isLoading } = useQuery({
    queryKey: ["usersAdmin"],
    queryFn: () => getUsersTable(token),
  });

  const { mutate } = useMutation({
    mutationFn: deleteTransactRow,
    onSuccess: () => {
      toast.success("Row deleted Successfully");
      queryClient.invalidateQueries("usersAdmin");
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => dispatch(updateGlobalLoadingStatus({ loading: false })),
  });

  // Save Transaction Data to store
  useEffect(
    function () {
      dispatch(updateGlobalLoadingStatus({ loading: isLoading }));
      if (!isLoading) {
        dispatch(populateUsers({ users: data }));
      }
    },
    [isLoading, data, dispatch],
  );

  function handleDelete() {
    setDeleteDialog(false);
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    mutate({ token, id: usersTable[rowIndex].id, endpoint: "auth" });
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
          id={usersTable[rowIndex]?.id}
          setSaveDialog={setSaveDialog}
          initialValues={initialValues}
          queryKey="userAdmin"
          path="auth"
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
          <Header text="users table" />
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
                    className="overflow-auto !bg-inherit !text-sm !text-gray-500 lg:!border-none lg:!text-lg"
                    key={item}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody className="space-y-6 lg:!block">
              {usersTable?.map((item, index) => (
                <TableRow
                  key={index}
                  className="!duration-400 grid-cols-6 rounded-2xl py-2 transition-all ease-in-out hover:bg-gray-300 lg:!grid lg:bg-gray-100"
                >
                  <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                    {item?.accountNumber}
                  </TableCell>
                  <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                    {item?.firstName ? item?.firstName : "no first name"}
                  </TableCell>
                  <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                    {item?.phone || "loading..."}
                  </TableCell>
                  <TableCell className="items-center overflow-auto !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                    {item?.email || "loading..."}
                  </TableCell>
                  <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                    {item?.username || "loading..."}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, index)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default UsersAdmin;
