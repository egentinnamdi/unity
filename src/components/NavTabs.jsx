import { Box, Tab, Tabs } from "@mui/material";
import { colors } from "../utils/config";

function NavTabs({ label, value, setValue }) {
  function handleChange(event, index) {
    setValue(index);
  }
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        className="!capitalize"
        classes={{
          indicator: "!bg-ui",
        }}
        sx={{
          "& .MuiButtonBase-root.MuiTab-root.Mui-selected ": {
            color: colors.uiRed,
          },
        }}
      >
        {label.map((item) => (
          <Tab
            key={item}
            label={item}
            className="!text-sm !capitalize lg:!text-2xl"
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default NavTabs;
