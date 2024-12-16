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
async function deleteCard(id) {
  const response = await fetch(`${url}/cards/${id}`, {
    method: "DELETE",
    headers: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    },
  });
  const deleted = await response.json();
  return deleted;
}

export { requestCard, deleteCard };
