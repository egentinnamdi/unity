import { Button } from "@mui/material";

function Btn({ text }) {
  return (
    <Button
      variant="contained"
      className="w-1/4 !rounded-3xl !bg-ui !p-4 !text-xl"
    >
      {text}
    </Button>
  );
}

export default Btn;
