import { Box, Stack, Typography } from "@mui/material";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Btn from "../ui/Btn";

const helpObj = [
  { label: "first name", variant: "filled" },
  { label: " last name", variant: "filled" },
  { label: "email", variant: "filled" },
  { label: "phone number", variant: "filled" },
  { label: "message", variant: "filled", span: 2 },
];
function Help() {
  return (
    <Box className="flex h-full flex-col space-y-7 p-10">
      <Header text="help desk" />
      <Typography variant="h4" className="text-gray-300 lg:!text-4xl">
        Say something to start a live chart!
      </Typography>
      <Stack spacing={6} className="px-10 py-16">
        <Box className="grid-cols-2 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
          {helpObj.map((item) => (
            <Input inpObj={item} />
          ))}
        </Box>
        <Box className="flex justify-end">
          <Btn text="send message" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Help;
