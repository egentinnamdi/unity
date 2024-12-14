import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  MenuItem,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import Search from "./components/Search";
import NavBar from "./NavBar";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { MenuRounded, MoreVert } from "@mui/icons-material";

const appBarItems = ["account", "settings", "log out"];
export default function AppLayout({ screenSize }) {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [appBarMenuOpen, setAppBarMenuOpen] = useState(false);
  function handleClick(event) {
    setAppBarMenuOpen((prev) => !prev);
    setMenuAnchor(event.currentTarget);
  }
  return (
    <Box className="flex" component="div">
      <NavBar open={open} setOpen={setOpen} screenSize={screenSize} />
      <Box className="flex !w-screen flex-grow flex-col">
        <AppBar position="static" className="!bg-white">
          <Toolbar className="flex-col justify-center gap-4 py-5 lg:flex-row-reverse lg:gap-7">
            <Box className="flex w-11/12 items-center justify-around gap-7 lg:w-5 lg:min-w-60 lg:justify-center">
              {screenSize && (
                <MenuRounded
                  onClick={() => setOpen((prev) => !prev)}
                  className="text-gray-600"
                  fontSize="large"
                />
              )}
              <Typography
                variant="body2"
                component="span"
                className="!text-base text-black lg:!text-lg"
              >
                John Doe
              </Typography>
              <Avatar
                src="/img/profile.jpg"
                alt="profile"
                className="!h-14 !w-14"
              />
              <IconButton onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                open={appBarMenuOpen}
                onClose={handleClick}
                anchorEl={menuAnchor}
                classes={{
                  paper: "p-4 !rounded-2xl",
                }}
              >
                {appBarItems.map((text) => {
                  return (
                    <Link to={`${text}`}>
                      <MenuItem
                        key={text}
                        onClick={handleClick}
                        className="capitalize !text-black"
                      >
                        {text}
                      </MenuItem>
                    </Link>
                  );
                })}
              </Menu>
            </Box>
            <Search />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" disableGutters className="flex-grow">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
