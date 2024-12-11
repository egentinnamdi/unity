import { Box, Icon, Typography } from "@mui/material";

export default function Balances({ icon, text }) {
  return (
    <Box className="grid place-items-center">
      <Box className="flex h-full w-5/6 rounded-xl border">
        <Box className="grid w-1/4 place-items-center">
          <Icon className="!grid !h-2/4 !w-2/4 place-items-center rounded-full bg-purple-100 text-secondary">
            {icon}
          </Icon>
        </Box>
        <Box className="flex w-3/4 flex-grow flex-col justify-center space-y-2 p-5 capitalize">
          <Typography className="!font-medium text-gray-500" variant="h6">
            {text}
          </Typography>
          <Typography variant="h4">$78,987.00</Typography>
        </Box>
      </Box>
    </Box>
  );
}
