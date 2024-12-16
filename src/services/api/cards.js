import { url } from "../../utils/CRUD";

async function requestCard(cardObj, jwtToken) {
  const response = await fetch(`${url}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(cardObj),
  });

  const result = await response.json();

  return result;
}

export { requestCard };
