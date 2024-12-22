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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { retrieveUserDataStatus } from "../store/slices/miscellaneousSlice";

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
      value: new Date(details?.createdAt).toDateString(),
    },
  ];

  function handleBack() {
    navigate(-1);
  }
  useEffect(function () {
    dispatch(
      retrieveUserDataStatus({
        isFetchingBalance: false,
        isFetchingUser: false,
      }),
    );
  }, []);
  return (
    <Box className="space-y-8">
      <AppBar position="static" className="!bg-white">
        <Toolbar className="!w-full justify-evenly py-8 capitalize !text-primary">
          <IconButton onClick={handleBack}>
            <ArrowBack className="lg:!text-4xl" />
          </IconButton>
          <Typography component="h1" className="!font-medium lg:!text-4xl">
            transaction details
          </Typography>
          <IconButton>
            <Link to="/home/help">
              <SupportAgentOutlined className="lg:!text-5xl" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={5}>
        {transactDetails.map((item, i) => (
          <Box className="flex justify-center gap-16 capitalize">
            <Typography className="flex w-2/4 justify-end">
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
