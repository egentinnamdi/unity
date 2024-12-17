import { createContext, useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login } from "../utils/CRUD";
import { useFormik } from "formik";

import {
  cardInitialVal,
  changePassInitialVal,
  loanInitialVal,
  supportInitialVal,
  transferInitialVal,
  userInitialVal,
} from "../services/formik/initialVals";
import { getWalletBalances } from "../services/api/wallets";
import Loader from "../ui/Loader";
import useMutate from "../services/hooks/useMutate";
import { changePassword } from "../services/api/auth";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import Btn from "../ui/Btn";

const Context = createContext(null);

// Login Credentials
const logDetails = {
  email: "johnDoe@gmail.com",
  password: "egentinnamdi10",
};

// Get User Id
const id = "efbef469-9133-424c-a238-23c49d96b667";

export default function UserContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const transactPinState = useState(null);
  const [token, setToken] = useState(null);
  const { cardsMutate, loanMutate, supportMutate, transferMutate, userMutate } =
    useMutate(setIsLoading);

  // Login
  const { data: loggedIn } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const tokenData = await login(logDetails);
      setToken(tokenData?.token);
      return tokenData;
    },
  });
  //   Get User data
  const { data: user } = useQuery({
    queryKey: ["retrieveUser", token],
    queryFn: () => getUser(id, token),
    staleTime: 1000 * 60 * 5,
  });
  //   Get User data
  const { data: users } = useQuery({
    queryKey: ["retrieveUser", token],
    queryFn: () => getAllUser(token),
  });

  //   Get Wallet Balances
  const query = useQuery({
    queryKey: ["wallet", token],
    queryFn: () => getWalletBalances(token),
  });
  const wallets = query.data;

  const loansFormik = useFormik({
    initialValues: loanInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      loanMutate({ formValues, token });
      resetForm();
    },
  });
  const userFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      userMutate({ formValues, token, id, image });
      resetForm();
    },
  });

  const cardFormik = useFormik({
    initialValues: cardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      cardsMutate({ formValues, token });
      resetForm();
    },
  });
  const supportFormik = useFormik({
    initialValues: supportInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      supportMutate({ formValues, token });
      resetForm();
    },
  });
  const transferFormik = useFormik({
    initialValues: transferInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      transferMutate({ formValues, token });
      resetForm();
    },
  });
  const changePassFormik = useFormik({
    initialValues: changePassInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      setIsLoading(true);
      toast.promise(changePassword(formValues.confirmPassword, token, id), {
        loading: "Loading...",
        success: () => {
          setIsLoading(false);
          return "Password changed successfully";
        },
        error: (err) => {
          setIsLoading(false);
          return `${err.message}`;
        },
      });
      resetForm();
    },
  });

  const data = {
    isLoading,
    loggedIn,
    user,
    loansFormik,
    userFormik,
    cardFormik,
    supportFormik,
    transferFormik,
    changePassFormik,
    setImage,
    transactPinState,
    wallets,
    setToken,
  };

  if (!token) {
    return (
      <Box className="grid h-screen place-items-center bg-primary">
        <Btn text="click to login" />
      </Box>
    );
  }

  return (
    <Context.Provider value={data}>
      {user === undefined ? <Loader /> : children}
    </Context.Provider>
  );
}

function useUser() {
  return useContext(Context);
}

export { useUser };
