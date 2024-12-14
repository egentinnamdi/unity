import {
  CurrencyExchangeOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoreVert,
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
import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import SuperAdminNav from "./SuperAdminNav";
import Logo from "./ui/Logo";

const navItems = [
  {
    icon: <HomeOutlined />,
    text: "dashboard",
  },
  {
    icon: <WalletOutlined />,
    text: "wallets",
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

const walletItems = ["wallets", "transfers", "cards", "loans"];

export default function NavBar({ open, setOpen, screenSize }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { pathname } = useLocation();
  function handleClick(event) {
    setMenuOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }
  function handleClose() {
    setOpen((prev) => !prev);
  }
  return (
    <Drawer
      className="flex h-screen w-64 flex-col capitalize"
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
          <NavLink to={`/${item.text}`} key={item.text}>
            <ListItem className="lg:mb-6" onClick={handleClose}>
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
                      <MoreVert />
                    </IconButton>
                  )}
                </ListItemText>
              </ListItemButton>
              {i === 1 ? (
                <Menu open={menuOpen} onClose={handleClick} anchorEl={anchor}>
                  {walletItems.map((text) => {
                    return (
                      <Link to={`${text}`} key={text}>
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
      <SuperAdminNav handleClose={handleClose} />

      {/* Help Page */}
      <Box className="flex flex-grow items-end pb-3 lg:py-10">
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
            out support team is at you disposal
          </Typography>
          <Link to="/help">
            <Button
              onClick={handleClose}
              variant="outlined"
              className="!border-purple-950 !capitalize !text-purple-950"
            >
              get help
            </Button>
          </Link>
        </Stack>
      </Box>
    </Drawer>
  );
}
