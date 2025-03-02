import React from "react";
import {
  ChevronRightOutlined,
  CurrencyExchangeOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionMarkOutlined,
  SettingsOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SuperAdminNav from "./SuperAdminNav";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { updateScreenSize } from "../../store/slices/miscellaneousSlice";

const navItems = [
  {
    icon: <HomeOutlined />,
    text: "dashboard",
  },
  {
    icon: <WalletOutlined />,
    text: "accounts",
  },
  {
    icon: <CurrencyExchangeOutlined />,
    text: "transactions",
  },
  {
    icon: <SettingsOutlined />,
    text: "settings",
  },
  {
    icon: <LogoutOutlined />,
    text: "log out",
  },
];

const walletItems = ["accounts", "transfers", "cards", "loans"];

export default function NavBar({ open, setOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const screenSize = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(
    function () {
      dispatch(updateScreenSize({ screenSize }));
    },
    [screenSize, dispatch],
  );
  function handleClick(event) {
    setMenuOpen((prev) => !prev);
    setOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }

  function handleClose() {
    setOpen((prev) => !prev);
  }

  return (
    <Drawer
      className="z-0 flex h-screen w-64 flex-col capitalize"
      variant={screenSize ? "temporary" : "permanent"}
      open={open}
      onClose={handleClose}
      classes={{
        paper: " w-64 h-screen",
      }}
    >
      <List>
        <ListItem
          classes={{
            padding: "!p-4 !text-lg flex justify-center",
          }}
        >
          <Logo />
        </ListItem>
        {navItems.map((item, i) => (
          <NavLink to={`${item.text}`} key={item.text}>
            <ListItem className="lg:mb-6" onClick={() => handleClose(i)}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  className="capitalize"
                  classes={{
                    primary: "!font-medium lg:!text-lg",
                  }}
                >
                  {item.text}
                  {i === 1 && (
                    <IconButton
                      className="!text-inherit"
                      onClick={i === 1 ? handleClick : undefined}
                    >
                      <ChevronRightOutlined />
                    </IconButton>
                  )}
                </ListItemText>
              </ListItemButton>
              {i === 1 ? (
                <Menu
                  open={menuOpen}
                  classes={{ paper: "px-4 py-1 !rounded-lg" }}
                  onClose={handleClick}
                  anchorEl={anchor}
                >
                  {walletItems.map((text, i) => {
                    return (
                      <Link
                        to={i === 0 ? "accounts" : `accounts/${text}`}
                        key={text}
                      >
                        <MenuItem
                          onClick={handleClick}
                          className="capitalize !text-black"
                        >
                          {text}
                        </MenuItem>
                      </Link>
                    );
                  })}
                </Menu>
              ) : null}
            </ListItem>
          </NavLink>
        ))}
      </List>
      {/* Super Admin NavBar */}
      {user.role === "user" ? null : (
        <SuperAdminNav handleClose={handleClose} />
      )}
      {/* Help Page */}
      {user?.role === "admin" ? null : (
        <Box className="mt-3 flex flex-grow items-end pb-8 lg:mt-0 lg:py-10">
          <Stack
            className="flex flex-col items-center px-7 text-center"
            spacing={2}
            component="div"
          >
            <QuestionMarkOutlined className="rounded-full !border border-secondary text-secondary" />
            <Typography
              variant={screenSize ? "body1" : "h6"}
              component="span"
              className="!font-bold text-purple-950"
            >
              need help?
            </Typography>
            <Typography
              variant={screenSize ? "subtitle2" : "body2"}
              component="span"
            >
              our support team is at you disposal
            </Typography>
            <Link to="help">
              <Button
                onClick={handleClose}
                variant="outlined"
                className="!border-purple-950 !capitalize !text-purple-950"
              >
                get help
              </Button>
            </Link>
            <Typography
              variant="subtitle2"
              className="flex space-x-2 !text-sm lowercase text-gray-600"
            >
              <a href="mailto:info@unityfinanceonline.com">
                info@unityfinanceonline.com
              </a>
            </Typography>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
