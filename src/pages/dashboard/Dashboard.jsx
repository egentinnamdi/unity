import { Box } from "@mui/material";
import Transactions from "./Transactions";
import TotalBalance from "../../components/TotalBalance";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { screenSize } = useSelector((state) => state.others);
  return (
    // <AuthLayout>
    <Box className="space-y-6">
      <TotalBalance screenSize={screenSize} />
      <Transactions header={false} />
    </Box>
    // {/* </AuthLayout> */}
  );
}
