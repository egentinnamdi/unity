import { useTheme } from "@emotion/react";
import {
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
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

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

export default function NavBar({ open, setOpen }) {
  // const theme = useTheme();
  // const screenSize = useMediaQuery(theme.breakpoints?.down("lg"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
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
      variant="permanent"
      open={open}
      onClose={handleClose}
      classes={{
        paper: " w-64 h-screen",
      }}
    >
      <List>
        <ListItem
          classes={{
            padding: "!p-4 !text-lg",
          }}
        >
          <ListItemIcon>
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
        </ListItem>
        {navItems.map((item, i) => (
          <NavLink to={`/${item.text}`}>
            <ListItem
              key={item.text}
              className="mb-6"
              onClick={handleClose}
              // sx={{
              //   "&::focus .MuiTouchRipple-root": {
              //     background: "purple",
              //   },
              // }}
            >
              <ListItemButton onClick={i === 1 && handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  className="capitalize"
                  classes={{
                    primary: "!font-medium !text-lg",
                  }}
                >
                  {item.text}
                </ListItemText>
              </ListItemButton>
              {i === 1 ? (
                <Menu open={menuOpen} onClose={handleClick} anchorEl={anchor}>
                  {walletItems.map((text) => {
                    return (
                      <MenuItem
                        key={text}
                        onClick={handleClick}
                        className="capitalize !text-black"
                      >
                        <Link to="wallets/transfers">{text}</Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              ) : null}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Box className="grid flex-grow place-items-center">
        <Stack
          className="flex flex-col items-center px-7 text-center"
          spacing={2}
          component="div"
        >
          <QuestionMarkOutlined className="rounded-full !border border-secondary text-secondary" />
          <Typography
            variant="h6"
            component="span"
            className="!font-bold text-purple-950"
          >
            need help?
          </Typography>
          <Typography variant="body2" component="span">
            out support team is at you disposal
          </Typography>
          <Button
            variant="outlined"
            className="!border-purple-950 !capitalize !text-purple-950"
          >
            <Link to="/help">get help</Link>
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
