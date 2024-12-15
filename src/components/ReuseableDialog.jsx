import { CancelOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import BtnSecondary from "../ui/BtnSecondary";

function ReuseableDialog({
  open,
  handleDialog,
  title,
  text,
  action,
  children,
}) {
  function handleClick() {}
  return (
    <Dialog
      open={open}
      onClose={handleDialog}
      className="capitalize backdrop-blur-sm"
      classes={{
        paper: "w-5/6 min-!h-1/3 !rounded-xl",
      }}
    >
      <DialogTitle className="flex justify-between text-center uppercase text-gray-500">
        <span className="flex-grow pt-3 text-lg lg:text-xl">{title}</span>
        <CancelOutlined
          fontSize="large"
          className="mr-4 mt-4 rounded-full bg-search p-1 text-superNav"
          onClick={handleDialog}
        />
      </DialogTitle>
      <DialogContent className="flex !max-h-96 justify-center !p-3 lg:!px-7">
        {children}
        {text && (
          <DialogContentText className="pt-4 text-center !text-lg normal-case !text-primary lg:!text-2xl">
            {text}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions className="relative space-x-7 !p-10">
        <Box className="absolute left-10 top-9 w-32">
          <TextField variant="outlined" type="date" className="!rounded-xl" />
        </Box>
        {action.textOne && (
          <BtnSecondary
            variant="outlined"
            text={action?.textOne}
            onClick={handleDialog}
          />
        )}
        {action.textTwo && (
          <BtnSecondary text={action?.textTwo} onClick={handleDialog} />
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ReuseableDialog;
