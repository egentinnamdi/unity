import { Box, Stack, Typography } from "@mui/material";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Btn from "../ui/Btn";

const helpObj = [
  { label: "first name" },
  { label: " last name" },
  { label: "email" },
  { label: "phone number" },
  { label: "message", span: 2 },
];
function Help() {
  return (
    <Box className="flex h-full flex-col space-y-7 px-5 py-10 lg:p-10">
      <Header text="help desk" />
      <Typography variant="h4" className="!text-xl text-gray-300 lg:!text-4xl">
        Say something to start a live chart!
      </Typography>
      <Stack spacing={6} className="lg:px-10 lg:py-16">
        <Box className="grid-cols-2 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
          <HelpInputs />
        </Box>
        <Box className="flex justify-end">
          <Btn text="send message" />
        </Box>
      </Stack>
    </Box>
  );
}

function HelpInputs() {
  return (
    <>
      {helpObj.map((item) => (
        <Input inpObj={item} variant="filled" />
      ))}
    </>
  );
}

export { HelpInputs };
export default Help;
