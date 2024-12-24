import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "../../ui/Header";
import { useState } from "react";
import NavTabs from "../../components/NavTabs";
import { useUser } from "../../context/UserContext";
import {
  activateCardInitialVal,
  cardInitialVal,
} from "../../services/formik/initialVals";
import Input from "../../ui/data-inputs/Input";
import Btn from "../../ui/buttons/Btn";

const cardTabs = ["request card", "activate/deactivate card"];
const labelFields = [
  { label: "name on card" },
  { label: "card issuers" },
  { label: "credit/prepaid" },
  { label: "year of expiry" },
];
const activateCardLabelFields = [
  { label: "card number" },
  { label: "expiry date" },
  { label: "cvv" },
  { label: "action" },
];
const nameFields = Object.keys(cardInitialVal);
const activateCardNameFields = Object.keys(activateCardInitialVal);
// const superAdminCard = [...requestCard, ...activateCard];

function Cards() {
  const [value, setValue] = useState(0);
  const { cardFormik, activateCardFormik } = useUser();
  return (
    <Box className="flex h-full flex-col space-y-6 px-5 py-10 lg:px-10">
      <Header text="cards" />
      <NavTabs label={cardTabs} value={value} setValue={setValue} />
      <form
        onSubmit={
          value === 0
            ? cardFormik.handleSubmit
            : activateCardFormik.handleSubmit
        }
      >
        <Stack spacing={6} className="bg-search px-5 py-16 lg:px-10">
          <Box className="grid-cols-2 grid-rows-2 gap-20 space-y-6 lg:grid lg:space-y-0">
            {value === 0 &&
              nameFields.map((item, index) => (
                <Input
                  required={true}
                  key={item}
                  label={labelFields[index].label}
                  name={item}
                  formik={cardFormik}
                />
              ))}
            {value === 1 &&
              activateCardNameFields.map((item, index) => (
                <Input
                  required={true}
                  key={item}
                  name={item}
                  label={activateCardLabelFields[index].label}
                  formik={activateCardFormik}
                />
              ))}
          </Box>
          <Box className="flex justify-end">
            {/* Condition of btn text based on Value */}
            <Btn text={value ? "submit" : "request card"} type="submit" />
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function CardInputs({ variant }) {
  return (
    <>
      {activateCardNameFields.map((item, index) => (
        <Input
          key={item}
          name={item}
          label={activateCardLabelFields[index].label}
          variant={variant}
          // formik={}
        />
      ))}
    </>
  );
}

export { CardInputs };
export default Cards;
