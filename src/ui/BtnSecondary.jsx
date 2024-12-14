import { Button } from "@mui/material";

function BtnSecondary({ onClick, variant = "contained", text, icon }) {
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
