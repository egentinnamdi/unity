import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

function BtnSecondary({ onClick, variant = "contained", text, icon }) {
  const user = useSelector((state) => state.user);

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="!rounded-2xl !px-8 !py-3 !text-lg !capitalize"
      classes={{
        containedPrimary: "!bg-superNav !text-white",
        outlinedPrimary: "!border-superNav !text-superNav",
      }}
    >
      {icon}
      {text}
    </Button>
  );
}

export default BtnSecondary;
