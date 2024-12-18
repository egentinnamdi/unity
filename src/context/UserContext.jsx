import { createContext, useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login } from "../utils/CRUD";
import { useFormik } from "formik";

import {
  cardInitialVal,
  changePassInitialVal,
  internalInitialVal,
  internationalInitialVal,
  loanInitialVal,
  otherInitialVal,
  supportInitialVal,
  userInitialVal,
} from "../services/formik/initialVals";
import { getWalletBalances } from "../services/api/wallets";
import Loader from "../ui/Loader";
import useMutate from "../services/hooks/useMutate";
import { changePassword } from "../services/api/auth";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import Btn from "../ui/buttons/Btn";

const Context = createContext(null);

// Login Credentials
const logDetails = {
  email: "mary@example123.com",
  password: "Mary@Secure99",
};

// Get User Id
const id = "ce09d275-9d03-4c2b-8c21-509c705e4ec7";

export default function UserContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const {
    cardsMutate,
    loanMutate,
    supportMutate,
    internalMutate,
    otherMutate,
    internationalMutate,
    userMutate,
  } = useMutate(setIsLoading);

  // Login
  // const { data: loggedIn } = useQuery({
  //   queryKey: ["login"],
  //   queryFn: async () => {
  //     const tokenData = await login(logDetails);
  //     setToken(tokenData?.token);
  //     return tokenData;
  //   },
  // });
  //   Get User data
  const { data: user, error } = useQuery({
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
  //   FORMIK FOR THE TRANSFER PAGE, INTERNAL, OTHER AND INTERNATIONAL/////////////////////
  const internationalFormik = useFormik({
    initialValues: internationalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      internationalMutate({ formValues, token });
      resetForm();
    },
  });

  const internalFormik = useFormik({
    initialValues: internalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      internalMutate({ formValues, token });
      resetForm();
    },
  });
  const otherFormik = useFormik({
    initialValues: otherInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      otherMutate({ formValues, token });
      resetForm();
    },
  });
  ////////////////////////////////////////////////////////////////////////////////////////////
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
    user,
    loansFormik,
    userFormik,
    cardFormik,
    supportFormik,
    internalFormik,
    otherFormik,
    internationalFormik,
    changePassFormik,
    setImage,
    wallets,
    setToken,
  };

  return (
    <Context.Provider value={data}>
      {/* {user === undefined ? <Loader /> : children} */}
      {children}
    </Context.Provider>
  );
}

function useUser() {
  return useContext(Context);
}

export { useUser };
