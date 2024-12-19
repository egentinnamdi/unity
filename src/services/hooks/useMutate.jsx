import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createLoan } from "../api/loans";
import { updateUser } from "../../utils/CRUD";
import { requestCard } from "../api/cards";
import { help } from "../api/support";
import { makeTransfer } from "../api/transfers";

// Register User

//   Loans Mutation
export default function useMutate(setIsLoading) {
  const queryClient = useQueryClient();

  // Transfer Mutation
  const { mutate: internationalMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(makeTransfer(formValues, token, "international"), {
        loading: "Loading...",
        success: "Internal Transfer done successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });
  const { mutate: internalMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(makeTransfer(formValues, token, "internal"), {
        loading: "Loading...",
        success: "Transfer to other bank done successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });
  const { mutate: otherMutate } = useMutation({
    mutationFn: ({ formValues, token }) => {
      setIsLoading(true);
      return toast.promise(makeTransfer(formValues, token, "external"), {
        loading: "Loading...",
        success: "International Transfer done successfully",
        error: (err) => err.message,
      });
    },
    onSettled: () => setIsLoading(false),
  });

  return {
    internalMutate,
    internationalMutate,
    otherMutate,
  };
}
