import { Box, Button, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ArrowDownwardSharp } from "@mui/icons-material";
import TransactionTable from "../components/TransactionTable";
import { colors } from "../utils/config";
import Header from "../ui/Header";

export default function Transactions({ header = true }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  function handleClick(event, i) {
    setAnchorEl(event.currentTarget);
    setIndex(i);
    setOpen((prev) => !prev);
  }

  function handleValue(e, index) {
    setValue(index);
    console.log(index);
  }
  const tabs = ["all", "received", "sent"];
  const status = ["all", "completed", "pending", "cancelled"];
  return (
    <Box className="space-y-10 p-7">
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
              className="!capitalize lg:!text-2xl"
              sx={{
                "&.Mui-selected": {
                  borderBottom: 2,
                  color: colors.textPurple,
                },
              }}
            />
          ))}
        </Tabs>
        <Button
          className="w-1/5 !text-xl !capitalize !text-primary"
          variant="text"
          onClick={handleClick}
        >
          status: {status[index] || "all"} <ArrowDownwardSharp />
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
      <Box className="max-h-96 rounded-2xl bg-orange-500">
        <TransactionTable value={value} />
      </Box>
    </Box>
  );
}
