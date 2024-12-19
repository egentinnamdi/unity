import { url } from "../../utils/CRUD";

async function help({ modifiedObj, token }) {
  const response = await fetch(`${url}/support`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedObj),
  });
  const result = await response.json();

  return result;
}

export { help };
