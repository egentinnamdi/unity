import { createContext, useContext, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login, updateUser } from "../utils/CRUD";
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
import { useDispatch } from "react-redux";
import { loading } from "../store/slices/userSlice";
import { requestCard } from "../services/api/cards";
import { createLoan } from "../services/api/loans";
import { filterObject } from "../utils/helpers";
import { help } from "../services/api/support";
import { makeTransfer } from "../services/api/transfers";

const Context = createContext(null);

export default function UserContext({ children }) {
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");
  const id = Cookies.get("id");
  const dispatch = useDispatch();

  // Loans Completed//////////////////
  const { mutate: loanMutate } = useMutation({
    mutationFn: createLoan,
    onSuccess: (data) => {
      console.log(data, "userContext");
      toast.success("Loans borrowed successfully");
    },
    onError: () => toast.error("there was a problem processing your loan"),
    onSettled: () => dispatch(loading()),
  });

  const loansFormik = useFormik({
    initialValues: loanInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      console.log(modifiedObj);
      loanMutate({ modifiedObj, token });
      resetForm();
    },
  });

  // Settings Completed/////////////
  const { mutate: settingsMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries(["retrieveUser"]),
    onSettled: () => dispatch(loading()),
  });

  const settingsFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => Boolean(value)),
      );
      console.log(modifiedObj);
      settingsMutate({ modifiedObj, token, id });
      resetForm();
    },
  });

  // CARDS COMPLETED//////////////////////////////////////
  const { mutate: cardsMutate } = useMutation({
    mutationFn: requestCard,
    onSuccess: (data) => {
      if (data) throw Error("this request wasn't successful");
      toast.success("user created successfully");
    },
    onError: (err) => toast.error("There was a problem with cards"),
    onSettled: () => dispatch(loading()),
  });

  const cardFormik = useFormik({
    initialValues: cardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      cardsMutate({ modifiedObj, token });
      resetForm();
    },
  });

  // SUPPORT COMPLETED////////////////////////
  const { mutate: supportMutate } = useMutation({
    mutationFn: help,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Message sent successfully");
    },
    onError: (err) => toast.error("There was a problem with sending message"),
    onSettled: () => dispatch(loading()),
  });

  const supportFormik = useFormik({
    initialValues: supportInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      supportMutate({ modifiedObj, token });
      resetForm();
    },
  });
  //   FORMIK FOR THE TRANSFER PAGE, INTERNAL, OTHER AND INTERNATIONAL/////////////////////

  // INTERNATIONAL TRANSFER
  const { mutate: internationalMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: (data) => {
      toast.success("Transfer to international bank was successful");
    },
    onError: (err) => toast.error("There was a problem with sending transfer"),
    onSettled: () => dispatch(loading()),
  });

  const internationalFormik = useFormik({
    initialValues: internationalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      const modifiedObj = filterObject(formValues);
      internationalMutate({ modifiedObj, token, type: "international" });
      resetForm();
    },
  });

  // INTERNAL TRANSFER
  const { mutate: internalMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: (data) => {
      toast.success("Transfer to internal bank was successful");
    },
    onError: (err) => toast.error("There was a problem with sending transfer"),
    onSettled: () => dispatch(loading()),
  });

  const internalFormik = useFormik({
    initialValues: internalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      internalMutate({ modifiedObj, token, type: "internal" });
      resetForm();
    },
  });

  // EXTERNAL TRANSFERS/////////////
  const { mutate: otherMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: (data) => {
      toast.success("Transfer to external bank was successful");
    },
    onError: (err) => toast.error("There was a problem with sending transfer"),
    onSettled: () => loading(loading()),
  });

  const otherFormik = useFormik({
    initialValues: otherInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      otherMutate({ modifiedObj, token, type: "external" });
      resetForm();
    },
  });
  ////////////////////////////////////////////////////////////////////////////////////////////
  const changePassFormik = useFormik({
    initialValues: changePassInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      const modifiedObj = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => Boolean(value)),
      );
      dispatch(loading());
      toast.promise(changePassword(modifiedObj.confirmPassword, token, id), {
        loading: "Loading...",
        success: () => {
          dispatch(loading());
          return "Password changed successfully";
        },
        error: (err) => {
          dispatch(loading());
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
