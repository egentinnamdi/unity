import { Box, Typography } from "@mui/material";
import Balances from "../components/Balances";
import {
  ArrowDownwardSharp,
  ArrowUpward,
  CurrencyExchange,
  WalletOutlined,
} from "@mui/icons-material";

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
  return (
    <Box className="w-full flex-grow grid-cols-2 grid-rows-3 gap-y-10 space-y-10 p-7 lg:grid">
      <Box className="col-span-2 flex justify-center">
        <Box className="flex w-full flex-col items-start justify-center space-y-2 rounded-xl border !p-5 !pl-16 capitalize lg:w-5/6">
          <Typography variant={screenSize ? "h5" : "h4"}>
            account number
          </Typography>
          <Typography
            variant={screenSize ? "h6" : "h4"}
            className="!font-medium !text-gray-500"
          >
            8157950762
          </Typography>
        </Box>
      </Box>
      {balances.map((item) => (
        <Balances key={item.text} icon={item.icon} text={item.text} />
      ))}
    </Box>
  );
}

export default TotalBalance;
