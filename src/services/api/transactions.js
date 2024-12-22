import { url } from "../../utils/CRUD";

export async function getTransactions(token, id) {
  const response = await fetch(`${url}/transactions/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error("Transaction wasn't retrieved successfully");
  const transactions = await response.json();
  return transactions;
}
