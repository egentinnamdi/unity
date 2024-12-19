import { Box, Stack } from "@mui/material";
import Header from "../../ui/Header";
import { useState } from "react";
import NavTabs from "../../components/NavTabs";
import { useUser } from "../../context/UserContext";
import { cardInitialVal } from "../../services/formik/initialVals";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";

const cardTabs = ["request card", "activate/deactivate card"];
const requestCard = [
  { label: "name on card" },
  { label: "card issuers" },
  { label: "credit/prepaid" },
  { label: "year of expiry" },
];
const activateCard = [
  { label: "card number" },
  { label: "expiry date" },
  { label: "cvv" },
  { label: "action" },
];
const queryLabel = Object.keys(cardInitialVal);
const superAdminCard = [...requestCard, ...activateCard];

function Cards() {
  const [value, setValue] = useState(0);
  const { cardFormik, isLoading } = useUser();
  return (
    <Box className="flex h-full flex-col space-y-6 px-5 py-10 lg:px-10">
      <Header text="cards" />
      <NavTabs label={cardTabs} value={value} setValue={setValue} />
      <form onSubmit={cardFormik.handleSubmit}>
        <Stack spacing={6} className="bg-search px-5 py-16 lg:px-10">
          <Box className="grid-cols-2 grid-rows-2 gap-20 space-y-6 lg:grid lg:space-y-0">
            {value === 0 &&
              queryLabel.map((item, index) => (
                <Input
                  key={item}
                  labelAndName={item}
                  formik={cardFormik}
                  inpObj={{ index, ...requestCard }}
                />
              ))}
            {value === 1 &&
              activateCard.map((item) => (
                <Input key={item.label} inpObj={item} />
              ))}
          </Box>
          <Box className="flex justify-end">
            {/* Condition of btn text based on Value */}
            <Btn
              text={value ? "submit" : "request card"}
              type="submit"
              isLoading={isLoading}
            />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function CardInputs({ variant }) {
  return (
    <>
      {superAdminCard.map((item) => (
        <Input key={item.label} inpObj={item} variant={variant} />
      ))}
    </>
  );
}

export { CardInputs };
export default Cards;
