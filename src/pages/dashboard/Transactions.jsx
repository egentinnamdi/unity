import React, { useEffect } from "react";
import { Box, Button, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import TransactionTable from "../../components/TransactionTable";
import { colors } from "../../utils/config";
import Header from "../../ui/Header";
import { getTransactions } from "../../services/api/transactions";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateTransactions } from "../../store/slices/userSlice";
import toast from "react-hot-toast";
import TablePagination from "../../components/TablePagination";

export default function Transactions({ header = true }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const token = Cookies.get("token");
  const id = Cookies.get("identity");
  const dispatch = useDispatch();
  const { transactionsHistory } = useSelector((state) => state.user);

  const { data, error, isLoading } = useQuery({
    queryKey: ["transactions", token],
    queryFn: () => getTransactions(token, id),
  });

  useEffect(
    function () {
      if (error) toast.error(error.message);
      dispatch(updateTransactions({ transactions: data }));
    },
    [isLoading, dispatch, data, error],
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
    <Box className="space-y-10 px-4 py-7 lg:p-7">
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
      <Box className="min-h-96 rounded-2xl">
        <TransactionTable />
        {transactionsHistory.length > 0 && (
          <TablePagination data={transactionsHistory} />
        )}
      </Box>
    </Box>
  );
}
