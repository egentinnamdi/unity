import toast from "react-hot-toast";
import { url } from "../../utils/CRUD";

async function makeTransfer({ modifiedObj, token, type }) {
  const response = await fetch(`${url}/transfers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...modifiedObj, type }),
  });

  if (!response.ok) throw Error("Internal transfer was unsuccessful");
  const result = await response.json();

  return result;
}

export { makeTransfer };
