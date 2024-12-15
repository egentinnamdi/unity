import { Cancel } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BtnSecondary from "../ui/BtnSecondary";

function ReuseableDialog({ open, setOpen, title, text, action, children }) {
  function handleClick() {}
  return (
    <Dialog
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      className="capitalize backdrop-blur-sm"
      classes={{
        paper: "w-5/6 min-!h-1/3 !rounded-xl",
      }}
    >
      <DialogTitle className="flex justify-between text-center uppercase text-gray-500">
        <span>{title}</span>
        <Cancel
          fontSize="large"
          className="mr-4 mt-4"
          onClick={() => setOpen((prev) => !prev)}
        />
      </DialogTitle>
      <DialogContent className="!max-h-96">
        {children}
        <DialogContentText className="pt-4 text-center !text-lg normal-case !text-primary lg:!text-2xl">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="space-x-7 !p-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BtnSecondary variant="outlined" text={action?.textOne} />
        <BtnSecondary text={action?.textTwo} />
      </DialogActions>
    </Dialog>
  );
}

export default ReuseableDialog;
