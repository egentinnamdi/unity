import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { colors } from "../utils/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const tableHead = ["created date", "name on card", "type", "mode", "action"];

function CustomTable({ handleDelete, tableData, setRowIndex }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [page, setPage] = useState(1);
  const { screenSize } = useSelector((state) => state.others);
  function handleClick(event, index) {
    setRowIndex(index);
    setOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }
  return (
    <>
      <Menu
        open={open}
        onClose={handleClick}
        anchorEl={anchor}
        className="capitalize"
        classes={{ paper: "p-2 !rounded-xl" }}
      >
        <MenuItem className="!font-medium !text-superNav">
          <Edit />
          <span>edit</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete(handleClick)}
          className="!font-medium !text-pink-400"
        >
          <Delete />
          <span>delete</span>
        </MenuItem>
      </Menu>
      <TableContainer>
        <Table stickyHeader className="space-y-6 capitalize">
          {/* Table Head */}
          <TableHead className="lg:!block">
            <TableRow className="grid-cols-5 bg-search py-3 lg:!grid">
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
            {tableData?.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/transaction-receipt/${index}`}
                  className="block"
                >
                  <TableRow className="!duration-400 grid-cols-5 rounded-2xl py-2 transition-all ease-in-out hover:bg-gray-300 lg:!grid lg:bg-gray-100">
                    <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                      {new Date(item.createdAt).toDateString()}
                    </TableCell>
                    <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                      {item.sender.firstName}
                    </TableCell>
                    <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                      {item.type}
                    </TableCell>
                    <TableCell className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base">
                      {item.mode}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleClick(event, index)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="flex h-28 items-end justify-center p-3">
        <Paper elevation={4} className="!rounded-2xl">
          <Pagination
            count={screenSize ? 4 : 8}
            page={page}
            size={screenSize ? "medium" : "large"}
            onChange={() => setPage((prev) => prev + 1)}
            // boundaryCount={}
            className="rounded-2xl border border-superNav p-4 !font-medium"
            classes={{ ul: " " }}
            sx={{
              "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
                color: "white",
                background: colors.superNav,
              },
              "& .MuiPaginationItem-root": {
                color: colors.superNav,
                fontWeight: 600,
                borderColor: colors.superNav,
                borderWidth: 1,
              },
            }}
          />
        </Paper>
      </Box>
    </>
  );
}

export default CustomTable;
