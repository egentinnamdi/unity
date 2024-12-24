import { ArrowBack, SupportAgentOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
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
    <Box className="">
      <Box className="flex h-24 items-center bg-blue-950 !text-8xl capitalize text-white lg:px-5">
        <Logo size={20} />
      </Box>
      <Box className="flex h-14 items-center justify-between bg-gray-700 px-6 capitalize text-white lg:px-16">
        <Typography className="!font-medium" component="span">
          general electric
        </Typography>
        <Typography className="!font-medium" component="span">
          created at
        </Typography>
      </Box>
      <Container
        maxWidth="md"
        disableGutters
        className="flex min-h-[79vh] flex-col space-y-6 border p-10 text-gray-600"
      >
        <Box className="">
          <Typography
            component="h2"
            variant="h4"
            className="!font-medium capitalize"
          >
            internal pay now
          </Typography>
        </Box>
        <Stack spacing={2} className="flex-grow">
          {transactDetails.map((item) => (
            <Box className="flex h-full justify-center capitalize">
              <Typography component="span" variant="h6" className="w-2/4">
                {item.name}
              </Typography>
              <Typography component="span" variant="h6" className="w-2/4">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default TransactionReceipt;
