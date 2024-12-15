import { Box, TextField } from "@mui/material";
import Transactions from "./Transactions";
import TotalBalance from "../components/TotalBalance";
import { useRef } from "react";

export default function Dashboard({ screenSize }) {
  const inputRef = useRef(null);
  console.log(inputRef.current);
  return (
    <Box className="space-y-6">
      <TotalBalance screenSize={screenSize} />
      <Transactions header={false} />
      {/* <TextField type="file" ref={inputRef} /> */}
    </Box>
  );
}
