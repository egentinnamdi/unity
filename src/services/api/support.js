import { url } from "../../utils/CRUD";

async function help(helpObj, jwtToken) {
  const response = await fetch(`${url}/support`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(helpObj),
  });
  const result = await response.json();

  return result;
}

export { help };
