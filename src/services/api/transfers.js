import { url } from "../../utils/CRUD";

async function makeTransfer(transferOgj, jwtToken) {
  const response = await fetch(`${url}/transfers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(transferOgj),
  });
  const result = await response.json();
  return result;
}

export { makeTransfer };
