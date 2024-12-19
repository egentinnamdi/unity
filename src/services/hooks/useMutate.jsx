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

  return {
    internalMutate,
    internationalMutate,
    otherMutate,
  };
}
