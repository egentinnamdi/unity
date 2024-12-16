import { createContext, useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login } from "../utils/CRUD";
import { useFormik } from "formik";

import {
  cardInitialVal,
  loanInitialVal,
  supportInitialVal,
  transferInitialVal,
  userInitialVal,
} from "../services/formik/initialVals";
import { getWalletBalances } from "../services/api/wallets";
import Loader from "../ui/Loader";
import useMutate from "../services/hooks/useMutate";

const Context = createContext(null);

// Login Credentials
const logDetails = {
  email: "grace@example.com",
  password: "GracePass2025",
};

// Get User Id
const id = "072ff946-4991-4d4e-a7a6-0b6e58054c84";

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
  });
  console.log(user);
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
      loanMutate({ formValues, token: loggedIn.token });
      resetForm();
    },
  });
  const userFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      userMutate({ formValues, token: loggedIn.token, id, image });
      //   resetForm();
    },
  });

  const cardFormik = useFormik({
    initialValues: cardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      cardsMutate({ formValues, token: loggedIn.token });
      resetForm();
    },
  });
  const supportFormik = useFormik({
    initialValues: supportInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      supportMutate({ formValues, token: loggedIn.token });
      resetForm();
    },
  });
  const transferFormik = useFormik({
    initialValues: transferInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      transferMutate({ formValues, token: loggedIn.token });
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
    setImage,
    transactPinState,
    wallets,
    setToken,
  };

  if (!token) {
    return <p>click to login</p>;
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
