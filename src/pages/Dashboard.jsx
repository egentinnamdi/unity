import { Box } from "@mui/material";
import Transactions from "./Transactions";
import TotalBalance from "../components/TotalBalance";

export default function Dashboard({ screenSize }) {
  return (
    <Box className="space-y-6">
      <TotalBalance screenSize={screenSize} />
      <Transactions header={false} />
    </Box>
  );
}
