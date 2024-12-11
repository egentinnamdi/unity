import { Cancel } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ReuseableDialog({ open, setOpen, title, text, action, children }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      className="capitalize backdrop-blur-sm"
      classes={{
        paper: "w-2/4 h-1/3 !rounded-xl",
      }}
    >
      <DialogTitle className="flex justify-center text-center uppercase text-gray-500">
        <span>{title}</span>
        <Cancel onClick={() => setOpen((prev) => !prev)} />
      </DialogTitle>
      <DialogContent className="grid place-items-center">
        {children}
        <DialogContentText className="!text-2xl !font-medium !text-ui">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="!p-10" onClick={() => setOpen((prev) => !prev)}>
        <Button
          variant="contained"
          className="!rounded-lg !bg-secondary !px-4 !text-lg !capitalize"
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReuseableDialog;
