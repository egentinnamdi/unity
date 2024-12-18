import { Box, Divider, List, ListItem, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";

const superNav = [
  "transactions",
  "users",
  "cards",
  "transfers",
  "loans",
  "support",
];
function SuperAdminNav({ handleClose }) {
  return (
    <>
      <Divider variant="middle" className="!border-superNav uppercase" />
      <List className="min-h-96">
        {superNav.map((item) => (
          <NavLink key={item} className="super" to={`admin/${item}`}>
            <ListItem>
              <ListItemButton
                onClick={handleClose}
                className="!text-center !font-medium !text-gray-700 lg:!text-lg"
              >
                {item} table
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </>
  );
}

export default SuperAdminNav;
