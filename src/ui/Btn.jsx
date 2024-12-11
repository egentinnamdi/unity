import { Button } from "@mui/material";

function Btn({ text, setOpen }) {
  return (
    <Button
      onClick={() => setOpen((prev) => !prev)}
      variant="contained"
      className="w-full !rounded-3xl !bg-ui !p-4 !text-lg lg:w-1/4 lg:!text-xl"
    >
      {text}
    </Button>
  );
}

export default Btn;
