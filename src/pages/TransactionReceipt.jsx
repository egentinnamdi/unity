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
  const params = useParams();
  const ref = useRef(null);
  const details = transactionsHistory[params.id];
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
    { name: "amount", value: details?.amount },
    { name: "transfer fee", value: "0.00" },
    { name: "amount paid", value: details?.amount },
    {
      name: "recipient id",
      value: details?.receiverId,
    },
    {
      name: "sender id",
      value: details?.senderId,
    },
    { name: "transaction type", value: details?.type },
    { name: "payment method", value: details?.mode },
    { name: "status", value: details?.status },
    { name: "transaction id", value: details?.userId },
    {
      name: "transaction date",
      value: new Date(details?.createdAt || null).toDateString(),
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
        <Typography className="!font-medium !text-center" component="span">
          transaction receipt
        </Typography>
        <Typography className="text-right !font-medium" component="span">
          created at: {new Date(details?.createdAt || null).toIsoString()}
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
            internal pay now
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
        <Typography variant="subtitle2" className="lg:text-center">
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
