import { ArrowBack, SupportAgentOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const transactDetails = [
  { name: "amount", value: 2700 },
  { name: "transfer fee", value: 2700 },
  { name: "amount paid", value: 2700 },
  { name: "recipient details", value: 2700 },
  { name: "transaction type", value: 2700 },
  { name: "payment method", value: 2700 },
  { name: "transaction date", value: 2700 },
];

function TransactionReceipt() {
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
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
            <Link to="/home/support">
              <SupportAgentOutlined className="lg:!text-5xl" />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={5}>
        {transactDetails.map((item, i) => (
          <Box className="flex justify-evenly capitalize">
            <Typography>{item.name}</Typography>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default TransactionReceipt;
