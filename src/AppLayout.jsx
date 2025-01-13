import React from "react";
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
import NavBar from "./ui/navbar/NavBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AccountBoxOutlined,
  Logout,
  MenuRounded,
  MoreVert,
  Settings,
} from "@mui/icons-material";
import Logo from "./ui/Logo";
import ReuseableDialog from "./components/ReuseableDialog";
import InputSecondary from "./ui/data-inputs/InputSecondary";
import { createPin } from "./services/api/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTransactionPin, updateUser } from "./store/slices/userSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RouterConstantUtil } from "./utils/constants/RouterConstantUtils";
import { getWalletBalances } from "./services/api/wallets";
import { getUser } from "./utils/CRUD";
import Cookies from "js-cookie";
import Authorization from "./router/components/Authorization";
import { updateGlobalLoadingStatus } from "./store/slices/miscellaneousSlice";

// const appBarItems = ["account", "settings", "log out"];
const appBarItems = [
  { text: "accounts", icon: <AccountBoxOutlined /> },
  { text: "settings", icon: <Settings /> },
  { text: "log out", icon: <Logout /> },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [transactionPin, setTransactionPin] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [appBarMenuOpen, setAppBarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { screenSize } = useSelector((state) => state.others);
  const token = Cookies.get("token");
  const id = Cookies.get("identity");

  // Create Transaction Pin Both Redux store and  Database

  // Fetch User and wallet Balance
  // Retrieve User
  const {
    data: fetchedUser,
    // error: userError,
    isLoading: isFetchingUser,
    // ...rest
  } = useQuery({
    queryKey: ["retrieveUser", token],
    queryFn: () => getUser(id, token),
  });
  // Fetch Wallet Balance
  const {
    data: balance,
    // error,
    isLoading: isFetchingBalance,
  } = useQuery({
    queryKey: ["wallet", token],
    queryFn: () => {
      return getWalletBalances(token);
    },
  });
  useEffect(
    function () {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
      if (!isFetchingBalance && !isFetchingUser) {
        Cookies.set("pin", fetchedUser?.transactionPin);
        const arrBalance = Array.from(balance || []);
        dispatch(
          updateUser({
            balance: arrBalance?.at(0)?.balance || 0,
            ...fetchedUser,
          }),
        );
        dispatch(updateGlobalLoadingStatus({ loading: false }));
      }
    },
    [
      balance,
      isFetchingBalance,
      isFetchingUser,
      user?.role,
      dispatch,
      fetchedUser,
    ],
  );

  // Create Pin
  const { mutate } = useMutation({
    mutationFn: createPin,
    onSuccess: (data) => {
      if (!data.transactionPin)
        throw Error("Pin wasn't created, please try again");

      toast.success("Pin created successfully");
      Cookies.set("pin", data.transactionPin, { expires: 30 });
      dispatch(createTransactionPin({ transactionPin }));
      navigate(RouterConstantUtil.page.dashboard);
      setDialogOpen(false);
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
    },
  });
  function handleConfirm() {
    dispatch(updateGlobalLoadingStatus({ loading: true }));
    mutate({ token, id, transactionPin });
  }

  function handleCancel() {
    if (!user?.transactionPin) {
      return toast.error(
        "You do not have a transaction pin, please create one",
      );
    }
    setDialogOpen((prev) => !prev);
  }

  function handleClick(event) {
    setAppBarMenuOpen(true);
    setMenuAnchor(event.currentTarget);
  }
  return (
    <Authorization>
      <Box className="flex" component="div">
        {/* Dialog Box For the user to create a Pin Once Logged in */}
        {fetchedUser?.transactionPin === null ? (
          <ReuseableDialog
            open={dialogOpen}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            handleDialog={handleCancel}
            title="create your transaction pin"
            action={{ textTwo: "confirm" }}
          >
            <InputSecondary
              length={4}
              transactionPin={transactionPin}
              setTransactionPin={setTransactionPin}
            />
          </ReuseableDialog>
        ) : null}

        {/* Side Navigation Bar */}
        <NavBar open={open} setOpen={setOpen} />

        <Box className="flex !w-screen flex-grow flex-col">
          {/* Top App Bar */}
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
                    className="!text-base capitalize text-black lg:!text-lg"
                  >
                    hello{" "}
                    {user.firstName ? `${user?.firstName}!👋` : user?.username}
                  </Typography>
                )}
                <Box className="flex lg:gap-6">
                  <Avatar
                    onClick={handleClick}
                    src={user?.profilePicture}
                    alt="profile"
                    className="!h-10 !w-10 lg:!h-14 lg:!w-14"
                  />
                  <IconButton onClick={handleClick}>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Menu
                  open={appBarMenuOpen}
                  onClose={() => setAppBarMenuOpen(false)}
                  anchorEl={menuAnchor}
                  classes={{
                    paper: "p-4 !rounded-2xl",
                  }}
                >
                  {appBarItems.map((item) => {
                    return (
                      <Link key={item.text} to={`${item.text}`}>
                        <MenuItem
                          onClick={() => setAppBarMenuOpen(false)}
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

          {/* Content */}
          <Container maxWidth="xl" disableGutters className="flex-grow">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Authorization>
  );
}
