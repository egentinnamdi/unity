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

const transactionHeader = [
  "transaction date",
  "from",
  "type",
  "amount",
  "status",
  "actions",
];
function TransactionTable({ value }) {
  return (
    <Box className="overflow-auto">
      <TableContainer component={Paper} className="">
        <Table className="capitalize">
          <TableHead>
            <TableRow className="!text-xl">
              {transactionHeader.map((item) => (
                <TableCell key={item} className="!text-sm">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>transaction date</TableCell>
              <TableCell>from</TableCell>
              <TableCell>type</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>status</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>transaction date</TableCell>
              <TableCell>from</TableCell>
              <TableCell>type</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>status</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>transaction date</TableCell>
              <TableCell>from</TableCell>
              <TableCell>type</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>status</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionTable;
