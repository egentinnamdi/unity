import { Box } from "@mui/material";
import Transactions from "./Transactions";
import TotalBalance from "../components/TotalBalance";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/CRUD";

const id = "efedbc5d-5adf-44fd-a23d-823f9f24b957";

export default function Dashboard({ screenSize }) {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
  });
  console.log(query);

  return (
    <Box className="space-y-6">
      <TotalBalance screenSize={screenSize} />
      <Transactions header={false} />
    </Box>
  );
}
