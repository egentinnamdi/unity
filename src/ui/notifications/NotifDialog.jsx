import React from "react";
import { CheckCircleSharp } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTransferStatus } from "../../store/slices/miscellaneousSlice";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";

function NotifDialog() {
  const others = useSelector((state) => state.others);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={others.transferred}
      onClose={() => {
        dispatch(updateTransferStatus({ transferred: false }));
        if (others.transferred) {
          location.href = `/home/${RouterConstantUtil.page.transactions}`;
        }
      }}
      classes={{ paper: "lg:w-1/4 h-2/4 !px-4 !rounded-xl " }}
      className="capitalize"
    >
      <DialogContent className="flex !h-20 flex-col items-center justify-center space-y-6">
        {others.transferred && (
          <CheckCircleSharp className="!text-7xl text-green-600" />
        )}
        <Typography
          variant="body1"
          component="span"
          className="text-center !text-xl !font-medium"
        >
          {others.transferred && "transfer successful"}
        </Typography>
      </DialogContent>
      <DialogActions className="flex justify-center !p-8">
        <Button
          variant="contained"
          onClick={() => {
            dispatch(updateTransferStatus({ transferred: false }));
            if (others.transferred) {
              location.href = `/home/${RouterConstantUtil.page.transactions}`;
            }
          }}
          className="!px-7 !py-2"
        >
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotifDialog;
