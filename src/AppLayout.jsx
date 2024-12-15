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
import {
  AccountBoxOutlined,
  Logout,
  MenuRounded,
  MoreVert,
  Settings,
} from "@mui/icons-material";
import Logo from "./ui/Logo";

// const appBarItems = ["account", "settings", "log out"];
const appBarItems = [
  { text: "account", icon: <AccountBoxOutlined /> },
  { text: "settings", icon: <Settings /> },
  { text: "log out", icon: <Logout /> },
];

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
            <Box className="flex w-full items-center justify-around gap-7 lg:!w-1/4 lg:min-w-60 lg:justify-evenly">
              {screenSize && (
                <MenuRounded
                  onClick={() => setOpen((prev) => !prev)}
                  className="text-gray-600"
                  fontSize="medium"
                />
              )}
              {screenSize ? (
                <Box className="flex !w-3/4 justify-center text-center !text-lg capitalize text-primary">
                  <Logo />
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  component="span"
                  className="!text-base text-black lg:!text-lg"
                >
                  John Doe
                </Typography>
              )}
              <Box className="flex lg:gap-6">
                <Avatar
                  src="/img/profile.jpg"
                  alt="profile"
                  className="!h-10 !w-10 lg:!h-14 lg:!w-14"
                />
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </Box>
              <Menu
                open={appBarMenuOpen}
                onClose={handleClick}
                anchorEl={menuAnchor}
                classes={{
                  paper: "p-4 !rounded-2xl",
                }}
              >
                {appBarItems.map((item) => {
                  return (
                    <Link key={item.text} to={`${item.text}`}>
                      <MenuItem
                        onClick={handleClick}
                        className="space-x-3 capitalize !text-gray-600"
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </MenuItem>
                    </Link>
                  );
                })}
              </Menu>
            </Box>
            <Search screenSize={screenSize} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" disableGutters className="flex-grow">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
