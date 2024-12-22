import { ArrowBack, SupportAgentOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../ui/Logo";

function TransactionReceipt() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactionsTable } = useSelector((state) => state.admin);
  const params = useParams();
  const details = transactionsTable[params.id];
  const transactDetails = [
    { name: "amount", value: details?.amount },
    { name: "transfer fee", value: "0.00" },
    { name: "amount paid", value: details?.amount },
    {
      name: "recipient name",
      value: details?.receiver.username,
    },
    {
      name: "recipient account number",
      value: details?.receiver.accountNumber,
    },
    { name: "transaction type", value: details?.type },
    { name: "payment method", value: details?.mode },
    {
      name: "transaction date",
      value: new Date(details?.createdAt || null).toDateString(),
    },
  ];

  function handleBack() {
    navigate(-1);
  }
  return (
    <Box className="space-y-8">
      <AppBar position="static" className="!bg-white">
        <Toolbar className="!w-full justify-evenly py-8 capitalize !text-primary">
          <IconButton onClick={handleBack}>
            <ArrowBack className="!text-3xl lg:!text-4xl" />
          </IconButton>
          <Typography
            component="h1"
            className="text-center !font-medium lg:!text-4xl"
          >
            transaction details
          </Typography>
          <IconButton>
            {/* <SupportAgentOutlined className="lg:!text-5xl" /> */}
            <Logo />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={5}>
        {transactDetails.map((item, i) => (
          <Box className="flex justify-center gap-16 capitalize">
            <Typography className="flex w-2/4 justify-end text-right lg:text-left">
              {item.name}
            </Typography>
            <Typography className="flex w-2/4 justify-start">
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default TransactionReceipt;
