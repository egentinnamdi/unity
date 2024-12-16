import { createContext, useContext, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login, updateUser } from "../utils/CRUD";
import { Formik, useFormik } from "formik";
import { createLoan } from "../services/api/loans";
import { requestCard } from "../services/api/cards";
import {
  cardInitialVal,
  loanInitialVal,
  supportInitialVal,
  userInitialVal,
} from "../services/formik/initialVals";
import toast from "react-hot-toast";
import { help } from "../services/api/support";

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

  console.log(image);
  // Login
  const { data: loggedIn } = useQuery({
    queryKey: ["login"],
    queryFn: () => login(logDetails),
  });

  //   Get User data
  const { data: user } = useQuery({
    queryKey: ["retrieveUser", loggedIn?.token],
    queryFn: () => getUser(id, loggedIn?.token),
  });

  //   Get User data
  const { data: users } = useQuery({
    queryKey: ["retrieveUser", loggedIn?.token],
    queryFn: () => getAllUser(loggedIn?.token),
  });
  //   console.log(users);

  //   Loans Mutation
  const { mutate: loanMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return createLoan(formValues, token);
    },
    onSuccess: (data) => {
      console.log("Loan posted successfully", data);
      setIsLoading(false);
      toast.success("Loan requested successfully");
    },
    onError: (err) => {
      toast.error("there was an error");
    },
  });

  //   User Mutation
  const { mutate: userMutate } = useMutation({
    mutationFn: ({ formValues, token, id, image }) =>
      updateUser(formValues, token, id, image),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => toast.error("there was error"),
  });

  //   Cards Mutation
  const { mutate: cardsMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return requestCard(formValues, token);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success("Card requested successfully");
      console.log(data);
    },
    onError: (err) => toast.error("there was error"),
  });

  //   Support Mutation
  const { mutate: supportMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return help(formValues, token);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success("Message Sent successfully");
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
      toast.error("there was error");
    },
  });

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
      resetForm();
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

  const data = {
    isLoading,
    loggedIn,
    user,
    loansFormik,
    userFormik,
    cardFormik,
    supportFormik,
    setImage,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

function useUser() {
  return useContext(Context);
}

export { useUser };
