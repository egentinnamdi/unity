import { url } from "../../utils/CRUD";

async function makeTransfer({ modifiedObj, token, type }) {
  const response = await fetch(
    `${url}/transfers/${type === "internal" ? "" : "other"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...modifiedObj, type }),
    },
  );

  if (!response.ok) throw Error(`${type} transfer was unsuccessful`);
  const result = await response.json();

  return result;
}

export { makeTransfer };
