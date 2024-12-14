import { ListItemIcon, ListItemText } from "@mui/material";

function Logo() {
  return (
    <>
      <ListItemIcon className="flex justify-center">
        <img src="/img/logo.png" alt="logo" />
      </ListItemIcon>
      <ListItemText
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 600,
            fontSize: 15,
          },
        }}
      >
        unity finance online
      </ListItemText>
    </>
  );
}

export default Logo;