import { Button } from "@mui/material";
import { useSelector } from "react-redux";

function Btn({ text, setOpen, type }) {
  const user = useSelector((state) => state.user);
  return (
    <Button
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
