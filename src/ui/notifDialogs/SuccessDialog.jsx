import { CheckCircleSharp, DoneOutline, InfoSharp } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTransferStatus } from "../../store/slices/miscellaneousSlice";

function SuccessDialog() {
  const others = useSelector((state) => state.others);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={others.transferred}
      onClose={() => dispatch(updateTransferStatus({ transferred: false }))}
      classes={{ paper: "lg:w-1/4 lg:h-2/4 !px-4 !rounded-xl " }}
      className="capitalize"
    >
      <DialogContent className="flex !h-20 flex-col items-center justify-center space-y-6">
        {!others.deactivated ? (
          <CheckCircleSharp className="!text-7xl text-green-600" />
        ) : (
          <InfoSharp className="!text-7xl text-orange-400" />
        )}
        <Typography
          variant="body1"
          component="span"
          className="text-center !text-xl !font-medium"
        >
          {!others.deactivated
            ? "transfer successful"
            : "account dormant and deactivated\nplease contact support"}
        </Typography>
      </DialogContent>
      <DialogActions className="flex justify-center !p-8">
        <Button
          variant="contained"
          onClick={() => dispatch(updateTransferStatus({ transferred: false }))}
          className="!px-7 !py-2"
        >
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuccessDialog;
