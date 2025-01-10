import React from "react";
import { Box, Typography } from "@mui/material";
import Balances from "../components/Balances";
import {
  ArrowDownwardSharp,
  ArrowUpward,
  CurrencyExchange,
  FileCopyOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const balances = [
  {
    icon: <CurrencyExchange className="!text-4xl" />,
    text: "balances",
  },
  {
    icon: <WalletOutlined className="!text-4xl" />,
    text: "savings",
  },
  {
    icon: <ArrowDownwardSharp className="!text-4xl" />,
    text: "incomes",
  },
  {
    icon: <ArrowUpward className="!text-4xl" />,
    text: "expenses",
  },
];

function TotalBalance({ screenSize }) {
  const user = useSelector((state) => state.user);
  async function handleCopy() {
    try {
      if (user.accountNumber) {
        await navigator.clipboard.writeText(user.accountNumber);
        toast.success("Account Number copied!");
      }
    } catch (err) {
      toast.error("Failed to copy");
    }
  }
  try {
    return (
      <Box className="w-full flex-grow grid-cols-2 grid-rows-3 gap-y-10 space-y-10 p-7 lg:grid">
        <Box className="col-span-2 flex justify-center gap-7 rounded-xl border py-7 lg:gap-10">
          <Box
            className="flex w-2/6 items-center justify-end lg:w-1/6"
            onClick={handleCopy}
          >
            <Box className="!grid place-items-end rounded-full bg-purple-100 !p-3 text-secondary !transition-all !duration-300 ease-in-out hover:scale-125 lg:!p-5">
              <FileCopyOutlined className="!text-4xl" />
            </Box>
          </Box>
          <Box className="flex !w-3/4 flex-col items-start justify-center capitalize lg:items-start">
            <Typography
              className="!font-medium"
              variant={screenSize ? "h5" : "h4"}
            >
              account number
            </Typography>
            <Typography
              variant={screenSize ? "h5" : "h4"}
              className="!font-medium !text-gray-600"
            >
              {user?.accountNumber || (
                <span className="animate-pulse lowercase">loading...</span>
              )}
            </Typography>
          </Box>
        </Box>
        {balances.map((item) => (
          <Balances
            key={item.text}
            icon={item.icon}
            balance={user.balance}
            text={item.text}
          />
        ))}
      </Box>
    );
  } catch (err) {
    toast.error(err.message);
  }
}

export default TotalBalance;
