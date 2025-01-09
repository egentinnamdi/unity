import { url } from "../../utils/CRUD";

// Get Support Table Admin
export async function getSupportTable(token) {
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
  return supportTable;
}

// Get Transaction Table Admin
export async function getTransactionsAdmin(token) {
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

// Get Cards Table admin
export async function getCardsTable(token) {
  const response = await fetch(`${url}/cards`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Could not retrieve cards table");
  const cards = await response.json();
  return cards;
}

// Get Loans Table admin
export async function getLoansTable(token) {
  const response = await fetch(`${url}/loans`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Could not retrieve loans table");
  const loans = await response.json();
  return loans;
}

// Get Users Table admin
export async function getUsersTable(token) {
  const response = await fetch(`${url}/auth`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Could not retrieve users table");
  const users = await response.json();
  return users;
}
// Update  Table
export async function updateTable({ token, id, modifiedObj, path, isPost }) {
  const response = await fetch(`${url}/${path}/${isPost ? "" : id}`, {
    method: isPost ? "POST" : "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedObj),
  });
  if (!response.ok) throw Error("Unable to update table");
  const updated = await response.json();
  return updated;
}

// Get Transfers Table Admin
export async function getTransfersTable(token) {
  const response = await fetch(`${url}/transfers/admin`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Could not retrieve transfers table");
  const transfers = await response.json();
  return transfers;
}

// Get Wallets Table admin
// export async function getWalletsTable(token) {
//   const response = await fetch(`${url}/wallets/admin`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) throw Error("Could not retrieve transfers table");
//   const wallets = await response.json();
//   return wallets;
// }

// // Get Transaction Statement
// export async function generateStatement(token) {
//   const response = await fetch(`${url}/transactions/generate-statement`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) throw Error("Unable to generate transaction statement");
//   const statement = await response.json();
//   console.log(statement);
//   return statement;
// }

// Delete Row
export async function deleteTransactRow({ token, id, endpoint }) {
  await fetch(`${url}/${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Suspend User
export async function suspendUser({ token, id, active }) {
  const response = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ phone: "2349176567876" }),
    body: JSON.stringify({ active }),
  });
  if (!response.ok)
    throw Error("User could not be suspended\nPlease try again");
  const suspended = await response.json();
  return suspended;
}
