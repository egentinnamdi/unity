import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

const transactionHeader = [
  "transaction date",
  "from",
  "type",
  "amount",
  "status",
  "actions",
];
function TransactionTable({}) {
  const user = useSelector((state) => state.user);
  return (
    <Box className="overflow-auto">
      <TableContainer component={Paper} className="">
        <Table className="capitalize">
          <TableHead>
            <TableRow className="!text-xl">
              {transactionHeader.map((item) => {
                return (
                  <>
                    {item === "actions" && user?.role === "user" ? null : (
                      <TableCell key={item} className="!text-sm">
                        {item}
                      </TableCell>
                    )}
                  </>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {user.transactions.map((item) => (
              <TableRow key={item}>
                <TableCell>transaction date</TableCell>
                <TableCell>from</TableCell>
                <TableCell>type</TableCell>
                <TableCell>amount</TableCell>
                <TableCell>status</TableCell>
                <TableCell>actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionTable;
