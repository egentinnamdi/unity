import { Backdrop, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

function Loader({ type, isLoggingIn }) {
  const [isRetrievingData, setIsRetrievingData] = useState(true);
  const { isFetchingUser, isFetchingBalance } = useSelector(
    (state) => state.others,
  );
  useEffect(
    function () {
      if (!isFetchingBalance && !isFetchingUser) {
        setIsRetrievingData(false);
      }
    },
    [isFetchingBalance, isFetchingUser],
  );
  const spinner = type === "login" ? isLoggingIn : isRetrievingData;
  return (
    <Backdrop
      open={spinner}
      className="z-10 flex h-screen items-center justify-center"
    >
      <HashLoader />
    </Backdrop>
  );
}

export default Loader;
