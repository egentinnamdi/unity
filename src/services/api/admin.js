import { url } from "../../utils/CRUD";

export async function getSupportTable(token, id) {
  const response = await fetch(`${url}/support`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Admin support table could not be fetched, please try again");
  }
  const supportTable = await response.json();
  console.log(supportTable);
  return supportTable;
}

export async function getTransactionsAdmin(token, id) {
  const response = await fetch(`${url}/transactions/admin`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error("Transaction wasn't retrieved successfully");
  const transactions = await response.json();
  return transactions;
}

export async function deleteTransactRow({ token, id }) {
  await fetch(`${url}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
