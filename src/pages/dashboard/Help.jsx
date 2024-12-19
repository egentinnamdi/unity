import { Box, Stack, Typography } from "@mui/material";
import Header from "../../ui/Header";
import Input from "../../ui/data-inputs/Input";
import { useUser } from "../../context/UserContext";
import { supportInitialVal } from "../../services/formik/initialVals";
import Btn from "../../ui/buttons/Btn";

const helpObj = [
  { span: 1 },
  { span: 1 },
  { span: 1 },
  { span: 1 },
  { span: 2, multiline: true },
];

const inputFields = Object.keys(supportInitialVal);
function Help() {
  const { supportFormik } = useUser();
  return (
    <Box className="flex h-full flex-col space-y-7 px-5 py-10 lg:p-10">
      <Header text="help desk" />
      <Typography variant="h4" className="!text-xl text-gray-300 lg:!text-4xl">
        Say something to start a live chart!
      </Typography>
      <form onSubmit={supportFormik.handleSubmit}>
        <Stack spacing={6} className="lg:px-10 lg:py-16">
          <Box className="grid-cols-2 grid-rows-3 gap-10 space-y-10 lg:grid lg:space-y-0">
            <HelpInputs formik={supportFormik} />
          </Box>
          <Box className="flex justify-end">
            <Btn text="send message" type="submit" />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function HelpInputs({ formik }) {
  return (
    <>
      {inputFields.map((item, index) => (
        <Input
          key={item}
          formik={formik}
          labelAndName={item}
          inpObj={{ index, ...helpObj }}
          variant="filled"
        />
      ))}
    </>
  );
}

export { HelpInputs };
export default Help;
