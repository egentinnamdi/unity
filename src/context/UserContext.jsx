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

import useMutate from "../services/hooks/useMutate";
import { changePassword } from "../services/api/auth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Context = createContext(null);

export default function UserContext({ children }) {
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");
  const id = Cookies.get("id");
  const {
    cardsMutate,
    loanMutate,
    supportMutate,
    internalMutate,
    otherMutate,
    internationalMutate,
    userMutate,
  } = useMutate();

  const loansFormik = useFormik({
    initialValues: loanInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
      loanMutate({ formValues, token });
      resetForm();
    },
  });
  const settingsFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      const modifiedObj = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => Boolean(value)),
      );
      userMutate({ modifiedObj, token, id, image });
      resetForm();
    },
  });

  const cardFormik = useFormik({
    initialValues: cardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      const modifiedObj = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => Boolean(value)),
      );
      cardsMutate({ modifiedObj, token });
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
    loansFormik,
    settingsFormik,
    cardFormik,
    supportFormik,
    internalFormik,
    otherFormik,
    internationalFormik,
    changePassFormik,
    setImage,
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
