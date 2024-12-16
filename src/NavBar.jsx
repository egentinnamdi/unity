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
import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import SuperAdminNav from "./SuperAdminNav";
import Logo from "./ui/Logo";
import { useUser } from "./context/UserContext";

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

export default function NavBar({ open, setOpen, screenSize, setLogoutDialog }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { user } = useUser();
  function handleClick(event) {
    setMenuOpen((prev) => !prev);
    setOpen((prev) => !prev);
    setAnchor(event.currentTarget);
  }

  function handleClose(i) {
    i === 4 && setLogoutDialog((prev) => !prev);
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
      {user?.role === "user" || true ? null : (
        <SuperAdminNav handleClose={handleClose} />
      )}

      {/* Help Page */}
      <Box className="flex flex-grow items-end pb-8 lg:py-10">
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
