import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
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
import { useState } from "react";

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

function CustomTable({ handleDelete }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
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
        <MenuItem className="!font-medium !text-pink-400 hover:!text-superNav">
          <Edit />
          <span>edit</span>
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete(handleClick)}
          className="!font-medium !text-pink-400 hover:!text-superNav"
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
            {Array.from({ length: 11 }).map((_, index) => {
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
    </>
  );
}

export default CustomTable;
