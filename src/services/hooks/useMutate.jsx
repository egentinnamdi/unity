import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLoan } from "../api/loans";
import { updateUser } from "../../utils/CRUD";
import { requestCard } from "../api/cards";
import { help } from "../api/support";
import { makeTransfer } from "../api/transfers";

//   Loans Mutation
export default function useMutate(setIsLoading) {
  const queryClient = useQueryClient();

  const { mutate: loanMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(createLoan(formValues, token), {
        loading: "Loading...",
        success: "Loan requested successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  //   User Mutation
  const { mutate: userMutate } = useMutation({
    mutationFn: ({ formValues, token, id, image }) => {
      setIsLoading(true);
      return toast.promise(updateUser(formValues, token, id, image), {
        loading: "Loading...",
        success: "User Data updated successfully",
        error: (err) => err.message,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["retrieveUser"]),

    onSettled: () => setIsLoading(false),
  });

  //   Cards Mutation
  const { mutate: cardsMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(requestCard(formValues, token), {
        loading: "Loading...",
        success: "Card requested successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  //   Support Mutation
  const { mutate: supportMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(help(formValues, token), {
        loading: "Loading...",
        success: "Message Sent successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  // Transfer Mutation
  const { mutate: transferMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(makeTransfer(formValues, token), {
        loading: "Loading...",
        success: "Transfer done successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  return { loanMutate, userMutate, cardsMutate, supportMutate, transferMutate };
}
