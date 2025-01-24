import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouterConstantUtil } from "../utils/constants/RouterConstantUtils";
import Logo from "../ui/Logo";
import { toPng } from "html-to-image";

function TransactionReceipt() {
  const { transactionsHistory } = useSelector((state) => state.user);
  const { transactionsTable, transfersTable } = useSelector(
    (state) => state.admin,
  );
  const params = useParams();
  const ref = useRef(null);

  // Note role for transfersTable is oAdmin
  const table =
    params?.role === "user"
      ? transactionsHistory
      : params?.role === "admin"
        ? transactionsTable
        : transfersTable;
  const details = table[params?.id];
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!details) {
        navigate(`/home/${RouterConstantUtil.page.transactions}`);
      }
    },
    [details, navigate],
  );
  const transactDetails = [
    { name: "amount", value: `$${Number(details?.amount).toLocaleString()}` },
    { name: "transfer fee", value: "$0.00" },
    {
      name: "amount paid",
      value: `$${Number(details?.amount).toLocaleString()}`,
    },
    {
      name: "sender",
      value:
        details?.senderUsername || details?.senderId || details?.user.username,
    },
    {
      name: "recipient",
      value:
        details?.receiverUsername ||
        details?.receiverId ||
        details?.receiverAccountName,
    },
    { name: "transaction type", value: details?.type },
    { name: "payment method", value: details?.mode || "transfer" },
    { name: "status", value: details?.status || "completed" },
    { name: "transaction id", value: details?.userId || details?.id },
    {
      name: "transaction time",
      value: details?.createdAt,
    },
  ];
  async function handleImageDownload() {
    if (ref.current === null) return;
    const url = await toPng(ref.current);
    const link = document.createElement("a");
    link.download = "transaction-receipt.png";
    link.href = url;
    link.click();
  }
  return (
    <Box className="" ref={ref}>
      <Box className="flex h-24 items-center bg-blue-950 !text-8xl capitalize text-white lg:px-5">
        <Logo size={20} />
        <Button variant="text" className=" " onClick={handleImageDownload}>
          download
        </Button>
      </Box>
      <Box className="flex h-14 items-center justify-between bg-gray-700 px-6 capitalize text-white lg:px-16">
        <Typography className="!text-center !font-medium" component="span">
          transaction receipt
        </Typography>
        <Typography className="text-right !font-medium" component="span">
          created at: {new Date(details?.createdAt || null).toDateString()}
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
            className="!text-3xl !font-medium capitalize"
          >
            {details?.type} pay now
          </Typography>
        </Box>
        <Stack spacing={2} className="flex-grow">
          {transactDetails.map((item) => (
            <Box
              key={item.name}
              className="flex h-full justify-center capitalize"
            >
              <Typography
                component="span"
                variant="h6"
                className="w-2/4 !text-base"
              >
                {item.name}
              </Typography>
              <Typography
                component="span"
                variant="h6"
                className="w-2/4 !text-base"
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Divider className="!border-gray-500 lg:!border-gray-300" />
        <Typography variant="subtitle2" className="text-center">
          This is computer generated receipt no signature required.
          <br />
          Electronic Receipt owns no official legal effect. You may go to branch
          to get the paper receipt
        </Typography>
      </Container>
    </Box>
  );
}

export default TransactionReceipt;
