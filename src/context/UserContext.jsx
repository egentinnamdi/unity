import { createContext, useContext, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUser, getUser, login, updateUser } from "../utils/CRUD";
import { useFormik } from "formik";

import {
  activateCardInitialVal,
  cardInitialVal,
  changePassInitialVal,
  internalInitialVal,
  internationalInitialVal,
  loanInitialVal,
  otherInitialVal,
  supportInitialVal,
  userInitialVal,
} from "../services/formik/initialVals";

// import useMutate from "../services/hooks/useMutate";
import { changePassword } from "../services/api/auth";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loading, updateBalanceAfterLoan } from "../store/slices/userSlice";
import { activateCard, requestCard } from "../services/api/cards";
import { createLoan } from "../services/api/loans";
import { filterObject } from "../utils/helpers";
import { help } from "../services/api/support";
import { makeTransfer } from "../services/api/transfers";
import { RouterConstantUtil } from "../utils/constants/RouterConstantUtils";

const Context = createContext(null);

export default function UserContext({ children }) {
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");
  const id = Cookies.get("identity");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Loans Completed//////////////////
  const { mutate: loanMutate } = useMutation({
    mutationFn: createLoan,
    onSuccess: (data) => {
      // dispatch(updateBalanceAfterLoan({ balance: data.balanceRemaining }));
      toast.success("Loans borrowed successfully");
      location.href = `/home/${RouterConstantUtil.page.dashboard}`;
    },
    onError: () => toast.error("there was a problem processing your loan"),
    onSettled: () => dispatch(loading()),
  });

  const loansFormik = useFormik({
    initialValues: loanInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      loanMutate({ modifiedObj, token });
      resetForm();
    },
  });

  // Settings Completed/////////////
  const { mutate: settingsMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data);
      // navigate(`/home/${RouterConstantUtil.page.dashboard}`);
      queryClient.invalidateQueries(["retrieveUser"]);
      location.href = `/home/${RouterConstantUtil.page.dashboard}`;
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => dispatch(loading()),
  });

  const settingsFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = Object.fromEntries(
        Object.entries(formValues).filter(([key, value]) => Boolean(value)),
      );
      settingsMutate({ modifiedObj, token, id, image });
      resetForm();
    },
  });

  // CARDS COMPLETED//////////////////////////////////////
  const { mutate: cardsMutate } = useMutation({
    mutationFn: requestCard,
    onSuccess: (data) => {
      console.log(data);
      if (!data.expiryYear) throw Error("This request wasn't successful");
      toast.success("Card created successfully");
    },
    onError: (err) => toast.error(err.message),
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

  // ACTIVATE CARD/////////////////////
  const { mutate: activateCardMutate } = useMutation({
    mutationFn: activateCard,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => toast.error(err.message),
    onSettled: dispatch(loading()),
  });
  const activateCardFormik = useFormik({
    initialValues: activateCardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      activateCardMutate({ modifiedObj, token });
      resetForm();
    },
  });

  // SUPPORT COMPLETED////////////////////////
  const { mutate: supportMutate } = useMutation({
    mutationFn: help,
    onSuccess: (data) => {
      toast.success("Message sent successfully");
      location.href = `/home/${RouterConstantUtil.page.dashboard}`;
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
      console.log(data);
      toast.success("Transfer to international bank was successful");
    },
    onError: (err) =>
      toast.error("User Not Found, Please Input a valid Account Number"),
    onSettled: () => dispatch(loading()),
  });

  const internationalFormik = useFormik({
    initialValues: internationalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      internationalMutate({ modifiedObj, token, type: "international" });
      resetForm();
    },
  });

  // INTERNAL TRANSFER
  const { mutate: internalMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Transfer to internal bank was successful");
    },
    onError: (err) =>
      toast.error("User Not Found, Please Input a valid Account Number"),
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
      console.log(data);
      toast.success("Transfer to external bank was successful");
    },
    onError: (err) =>
      toast.error("User Not Found, Please Input a valid Account Number"),
    onSettled: () => dispatch(loading()),
  });

  const otherFormik = useFormik({
    initialValues: otherInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(loading());
      const modifiedObj = filterObject(formValues);
      otherMutate({ modifiedObj, token, type: "external" });
      // resetForm();
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
    activateCardFormik,
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
