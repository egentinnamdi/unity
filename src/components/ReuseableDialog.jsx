import { CancelOutlined } from "@mui/icons-material";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BtnSecondary from "../ui/buttons/BtnSecondary";

function ReuseableDialog({
  open,
  handleCancel,
  handleConfirm,
  handleDialog,
  title,
  text,
  action,
  children,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleDialog}
      className="!z-10 capitalize backdrop-blur-sm"
      classes={{
        paper: "w-5/6 min-!h-1/3 !rounded-xl",
      }}
    >
      <DialogTitle className="flex justify-between text-center uppercase text-gray-500">
        <span className="flex-grow pt-3 text-lg lg:text-xl">{title}</span>
        <CancelOutlined
          fontSize="large"
          className="mr-4 mt-4 rounded-full bg-search p-1 text-superNav"
          onClick={handleCancel}
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
        {action.textOne && (
          <BtnSecondary
            variant="outlined"
            text={action?.textOne}
            onClick={handleCancel}
          />
        )}
        {action.textTwo && (
          <BtnSecondary text={action?.textTwo} onClick={handleConfirm} />
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ReuseableDialog;
