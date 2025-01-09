import { url } from "../../utils/CRUD";

export async function getTransactions(token, endpoint) {
  const response = await fetch(`${url}/transactions/user${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error("Transaction wasn't retrieved successfully");
  const transactions = await response.json();
  return transactions;
}
