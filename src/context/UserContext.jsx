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
import { resetPwdSchema } from "../utils/validationSchemas/authSchema";
import {
  deactivatedTransfer,
  updateGlobalLoadingStatus,
  updateTransferStatus,
} from "../store/slices/miscellaneousSlice";
import Loader from "../ui/Loader";

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
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });

  const loansFormik = useFormik({
    initialValues: loanInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
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
      queryClient.invalidateQueries(["retrieveUser"]);
      location.href = `/home/${RouterConstantUtil.page.dashboard}`;
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });

  const settingsFormik = useFormik({
    initialValues: userInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
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
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });

  const cardFormik = useFormik({
    initialValues: cardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
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
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });

  const activateCardFormik = useFormik({
    initialValues: activateCardInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
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
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });

  const supportFormik = useFormik({
    initialValues: supportInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
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
    onSuccess: () => {
      dispatch(updateTransferStatus({ transferred: true }));
    },
    onError: (err) => {
      if (!err.message) {
        toast.error("User Not Found, Please Input a valid Account Number");
      }
      // dispatch(updateTransferStatus({ transferred: true }));
    },
    onSettled: () => dispatch(updateGlobalLoadingStatus({ loading: false })),
  });

  const internationalFormik = useFormik({
    initialValues: internationalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));

      const modifiedObj = filterObject(formValues);
      internationalMutate({ modifiedObj, token, type: "international" });
      resetForm();
    },
  });

  // INTERNAL TRANSFER
  const { mutate: internalMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: () => {
      dispatch(updateTransferStatus({ transferred: true }));
    },
    onError: () =>
      toast.error("User Not Found, Please Input a valid Account Number"),
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
    },
  });

  const internalFormik = useFormik({
    initialValues: internalInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
      const modifiedObj = filterObject(formValues);
      internalMutate({ modifiedObj, token, type: "internal" });
      resetForm();
    },
  });

  // EXTERNAL TRANSFERS/////////////
  const { mutate: otherMutate } = useMutation({
    mutationFn: makeTransfer,
    onSuccess: () => {
      dispatch(updateTransferStatus({ transferred: true }));
    },
    onError: (err) => {
      if (!err.message) {
        toast.error("User Not Found, Please Input a valid Account Number");
      }
      // dispatch(updateTransferStatus({ transferred: true }));
    },
    onSettled: () => dispatch(updateGlobalLoadingStatus({ loading: false })),
  });

  const otherFormik = useFormik({
    initialValues: otherInitialVal,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
      const modifiedObj = filterObject(formValues);
      otherMutate({ modifiedObj, token, type: "external" });
      resetForm();
    },
  });
  ////////////////////////////////////////////////////////////////////////////////////////////

  const { mutate: changePassMutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (!data.password) toast.error("Something went wrong, please try again");
      toast.success("Password Successfully Changed");
      location.href = "/home";
    },
    onError: () => toast.error("Password wasn't changed"),
    onSettled: () => {
      dispatch(updateGlobalLoadingStatus({ loading: false }));
      dispatch(loading());
    },
  });
  const changePassFormik = useFormik({
    initialValues: changePassInitialVal,
    // validationSchema: resetPwdSchema,
    // validateOnChange: false,
    // validateOnBlur: true,
    onSubmit: (formValues, { resetForm }) => {
      const modifiedObj = filterObject(formValues);
      dispatch(updateGlobalLoadingStatus({ loading: true }));
      dispatch(loading());

      changePassMutate({ modifiedObj: modifiedObj.confirmPassword, token, id });
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
      <Loader />
      {children}
    </Context.Provider>
  );
}

function useUser() {
  return useContext(Context);
}

export { useUser };
