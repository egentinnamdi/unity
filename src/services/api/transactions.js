import { url } from "../../utils/CRUD";

export async function getTransactions(token, id) {
  const response = await fetch(`${url}/transactions/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error("Transaction wasn't retrieved successfully");
  const transactions = await response.json();
  console.log(transactions);
  return transactions;
}
