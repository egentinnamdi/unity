import {
  AppBar,
  Avatar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Search from "./components/Search";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "@mui/icons-material";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <Box className="flex" component="div">
      <NavBar open={open} setOpen={setOpen} />
      <Box className="flex flex-grow flex-col">
        <AppBar position="static" className="!bg-white">
          <Toolbar className="justify-center gap-7 p-4">
            {/* <Menu
              onClick={() => setOpen((prev) => !prev)}
              className="text-black"
            /> */}
            <Search />
            <Box className="flex w-60 items-center justify-center gap-7">
              <Typography
                variant="body2"
                component="span"
                className="!text-lg text-black"
              >
                John Doe
              </Typography>
              <Avatar
                src="/img/logo.png"
                alt="profile"
                className="!h-14 !w-14"
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" disableGutters className="flex-grow">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
