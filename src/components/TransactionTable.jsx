import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

const transactionHeader = [
  "transaction date",
  "from",
  "type",
  "amount",
  "status",
  "actions",
];
function TransactionTable() {
  const { transactionsHistory } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [receiptIndex, setReceiptIndex] = useState(null);
  const { next, previous } = useSelector((state) => state.others);
  return (
    <Box className="overflow-auto">
      <TableContainer component={Paper} className="">
        <Table className="capitalize">
          <TableHead>
            <TableRow className="!text-xl">
              {transactionHeader.map((item) => {
                return (
                  <TableCell key={item} className="!text-sm lg:!text-base">
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: transactionsHistory?.length }).map(
              (_, index) => {
                return (
                  index >= previous &&
                  index < next && (
                    <TableRow key={index}>
                      <TableCell className="overflow-auto">
                        {new Date(
                          transactionsHistory[index]?.createdAt,
                        ).toDateString() || "loading..."}
                      </TableCell>
                      <TableCell className="!overflow-auto">
                        {transactionsHistory[index]?.senderUsername ||
                          transactionsHistory[index]?.senderId ||
                          "loading..."}
                      </TableCell>
                      <TableCell className="overflow-auto">
                        {transactionsHistory[index]?.type || "loading..."}
                      </TableCell>
                      <TableCell className="overflow-auto">
                        {transactionsHistory[index]?.amount || "loading..."}
                      </TableCell>
                      <TableCell className="overflow-auto">
                        {transactionsHistory[index]?.status || "loading..."}
                      </TableCell>
                      <TableCell className="overflow-auto">
                        <IconButton
                          onClick={(e) => {
                            setOpen(true);
                            setAnchor(e.currentTarget);
                            setReceiptIndex(index);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          open={open}
                          anchorEl={anchor}
                          onClose={() => setOpen(false)}
                          classes={{
                            paper: " !rounded-xl",
                          }}
                          slotProps={{
                            paper: {
                              elevation: 1,
                            },
                          }}
                        >
                          <Link
                            to={`/transaction-receipt/${receiptIndex}`}
                            className="block"
                          >
                            <MenuItem>
                              <Typography className="capitalize">
                                view receipt
                              </Typography>
                            </MenuItem>
                          </Link>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  )
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionTable;
