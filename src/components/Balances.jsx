import React from "react";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";

export default function Balances({ icon, text, balance }) {
  try {
    // if (!wallets) {
    //   throw Error("Please refresh, wallets is  not defined");
    // }
    return (
      <Box className="grid place-items-center">
        <Box className="flex h-full w-5/6 rounded-xl border px-4">
          <Box className="grid w-1/4 place-items-center">
            <Box className="!grid place-items-center rounded-full bg-purple-100 p-3 text-secondary lg:p-4">
              {icon}
            </Box>
          </Box>
          <Box className="flex w-3/4 flex-grow flex-col justify-center space-y-2 p-5 capitalize">
            <Typography className="!font-medium text-gray-500" variant="h6">
              {text}
            </Typography>
            <Typography
              variant="h4"
              className={`${text === "balances" && "overflow-auto"} !text-2xl !font-medium lg:!text-4xl`}
            >
              {/* {`${wallets[0].balance}.00`} */}
              {text === "balances" && balance ? `${balance}.00` : "00.00"}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  } catch (err) {
    toast.error("There was an error");
  }
}
