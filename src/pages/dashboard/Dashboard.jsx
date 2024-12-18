import { Box } from "@mui/material";
import Transactions from "./Transactions";
import { AuthLayout } from "../layout/AuthLayout";
import TotalBalance from "../../components/TotalBalance";

export default function Dashboard({ screenSize }) {
  return (
    <AuthLayout>
      <Box className="space-y-6">
        <TotalBalance screenSize={screenSize} />
        <Transactions header={false} />
      </Box>
    </AuthLayout>
  );
}
