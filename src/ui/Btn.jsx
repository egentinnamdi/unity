import { Button } from "@mui/material";

function Btn({ text, setOpen, type, isLoading }) {
  return (
    <Button
      disabled={isLoading}
      type={type}
      onClick={setOpen ? () => setOpen((prev) => !prev) : null}
      variant="contained"
      className="w-full !rounded-3xl !bg-ui !p-4 !text-base lg:w-1/4 lg:!text-xl"
    >
      {text}
    </Button>
  );
}

export default Btn;
