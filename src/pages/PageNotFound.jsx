import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { retrieveUserDataStatus } from "../store/slices/miscellaneousSlice";
import { useDispatch } from "react-redux";

function PageNotFound() {
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(
      retrieveUserDataStatus({
        isFetchingBalance: false,
        isFetchingUser: false,
      }),
    );
  }, []);
  return (
    <Box className="grid h-screen place-items-center bg-primary">
      <Typography className="text-center !text-5xl !font-medium uppercase text-white">
        page not found
      </Typography>
    </Box>
  );
}

export default PageNotFound;
