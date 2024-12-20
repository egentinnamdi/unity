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

const tableHead = [
  "created date",
  "name on card",
  "card issuers",
  "credit/prepaid",
  "action",
];
const data = [
  "Sep 9, 2024, 04:30pm",
  "Johndoe@gmail.com",
  "John",
  10,
  "action",
];

function CustomTable({ handleDelete, screenSize }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [page, setPage] = useState(1);
  function handleClick(event) {
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
            {Array.from({ length: 0 }).map((_, index) => {
              return (
                <TableRow
                  key={index}
                  className="grid-cols-5 rounded-2xl py-2 lg:!grid lg:bg-gray-100"
                >
                  {data.map((dataItem) => (
                    <TableCell
                      className="items-center !border-none !text-xs !text-primary lg:!flex lg:!text-base"
                      key={dataItem}
                    >
                      {dataItem === "action" ? (
                        <IconButton onClick={handleClick}>
                          <MoreVert />
                        </IconButton>
                      ) : (
                        dataItem
                      )}
                    </TableCell>
                  ))}
                </TableRow>
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
