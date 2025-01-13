import React, { useEffect } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import TransactionTable from "../../components/TransactionTable";
import { colors } from "../../utils/config";
import Header from "../../ui/Header";
import { getTransactions } from "../../services/api/transactions";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loading, updateTransactions } from "../../store/slices/userSlice";
import toast from "react-hot-toast";
import TablePagination from "../../components/TablePagination";
import {
  resetPage,
  updateGlobalLoadingStatus,
} from "../../store/slices/miscellaneousSlice";

export default function Transactions({ header = true }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const {
    transactionsHistory: transactions,
    transactionsReceived,
    transactionsSent,
  } = useSelector((state) => state.user);
  const transactionsHistory = !value
    ? transactions
    : value === 1
      ? transactionsReceived
      : transactionsSent;

  const { data, error, isLoading } = useQuery({
    queryKey: ["transactions", token],
    queryFn: () => getTransactions(token, ""),
  });
  const received = useQuery({
    queryKey: ["received", token],
    queryFn: () => getTransactions(token, "/received"),
  });

  const sent = useQuery({
    queryKey: ["sent", token],
    queryFn: () => getTransactions(token, "/sent"),
  });

  useEffect(
    function () {
      dispatch(resetPage());
      dispatch(updateGlobalLoadingStatus({ loading: isLoading }));
      if (error) toast.error(error.message);
      dispatch(
        updateTransactions({
          transactions: data,
          received: received.data,
          sent: sent.data,
        }),
      );
    },
    [isLoading, dispatch, data, error, received.data, sent.data, value],
  );

  function handleClick(event, i) {
    setAnchorEl(event.currentTarget);
    setIndex(i);
    setOpen((prev) => !prev);
  }

  function handleValue(e, index) {
    setValue(index);
  }
  const tabs = ["all", "received", "sent"];
  const status = ["all", "completed", "pending", "cancelled"];

  return (
    <Box className="flex h-full flex-col space-y-10 px-4 py-7 lg:p-7">
      {header && <Header text="transaction history" />}
      <Box className="flex justify-between">
        <Tabs
          className="capitalize"
          value={value}
          onChange={handleValue}
          sx={{
            "& .MuiTabs-indicator": {
              borderBottom: 2,
              color: colors.textPurple,
            },
          }}
        >
          {tabs.map((item) => (
            <Tab
              label={item}
              key={item}
              className="!text-sm !capitalize lg:!text-2xl"
              sx={{
                "&.Mui-selected": {
                  // borderBottom: 2,
                  color: colors.textPurple,
                },
              }}
            />
          ))}
        </Tabs>

        {/* Status */}
        <Button
          className="w-1/5 !text-xs !capitalize !text-primary lg:!text-xl"
          variant="text"
          onClick={handleClick}
        >
          status: {status[index] || "all"}{" "}
          <ArrowDropDown className="ml-2 !text-base text-secondary lg:!text-3xl" />
        </Button>
        <Menu open={open} onClose={handleClick} anchorEl={anchorEl}>
          {status.map((item, i) => (
            <MenuItem
              onClick={(event) => handleClick(event, i)}
              className="capitalize"
              key={item}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {transactionsHistory?.length == 0 ? (
        <Box className="grid flex-grow place-items-center text-primary lg:pb-52">
          <Typography className="!text-xl !font-light lg:!text-4xl">
            Transaction history is empty
          </Typography>
        </Box>
      ) : (
        <Box className="rounded-2xl">
          <TransactionTable transactionsHistory={transactionsHistory} />
          {transactionsHistory?.length > 0 && (
            <TablePagination data={transactionsHistory} />
          )}
        </Box>
      )}
    </Box>
  );
}
