import { Box } from "@mui/material";
import Transactions from "./Transactions";
import TotalBalance from "../components/TotalBalance";

export default function Dashboard() {
  return (
    <Box className="space-y-6">
      <TotalBalance />
      <Transactions header={false} />
    </Box>
  );
}
