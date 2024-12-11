import { Box, Stack } from "@mui/material";
import Header from "../ui/Header";
import { useState } from "react";
import NavTabs from "../components/NavTabs";
import Btn from "../ui/Btn";
import Input from "../ui/Input";

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
function Cards() {
  const [value, setValue] = useState(0);
  return (
    <Box className="flex h-full flex-col space-y-6 p-10">
      <Header text="cards" />
      <NavTabs label={cardTabs} value={value} setValue={setValue} />
      <Stack spacing={6} className="bg-search px-10 py-16">
        <Box className="grid grid-cols-2 grid-rows-2 gap-20">
          {value === 0 &&
            requestCard.map((item) => <Input key={item.label} inpObj={item} />)}
          {value === 1 &&
            activateCard.map((item) => (
              <Input key={item.label} inpObj={item} />
            ))}
        </Box>
        <Box className="flex justify-end">
          {/* Condition of btn text based on Value */}
          <Btn text={value ? "submit" : "request card"} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Cards;
