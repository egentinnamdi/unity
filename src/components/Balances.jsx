import { Box, Typography } from "@mui/material";

export default function Balances({ icon, text }) {
  return (
    <Box className="grid place-items-center">
      <Box className="flex h-full w-5/6 rounded-xl border px-4">
        <Box className="grid w-1/4 place-items-center">
          <Box className="!grid place-items-center rounded-full bg-purple-100 p-3 text-secondary lg:p-4">
            {icon}
          </Box>
        </Box>
        <Box className="flex w-3/4 flex-grow flex-col justify-center space-y-2 p-5 capitalize">
          <Typography className="!font-medium text-gray-500" variant="h6">
            {text}
          </Typography>
          <Typography
            variant="h4"
            className="!text-2xl !font-medium lg:!text-4xl"
          >
            $78,987.00
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
