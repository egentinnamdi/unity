import React from "react";
import { Backdrop, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

function Loader({ type, isLoggingIn }) {
  const others = useSelector((state) => state.others);

  return (
    <Backdrop
      open={type === "login" ? isLoggingIn : others.globalIsLoading}
      className="!z-50 flex h-screen items-center justify-center"
    >
      <HashLoader />
    </Backdrop>
  );
}

export default Loader;
