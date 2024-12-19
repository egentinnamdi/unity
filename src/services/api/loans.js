import { url } from "../../utils/CRUD";

async function createLoan({ modifiedObj, token }) {
  const res = await fetch(`${url}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedObj),
  });

  const data = res.json();

  return data;
}

export { createLoan };
