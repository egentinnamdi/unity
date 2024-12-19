import toast from "react-hot-toast";
import { url } from "../../utils/CRUD";

async function requestCard({ modifiedObj, token }) {
  const response = await fetch(`${url}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedObj),
  });
  if (!response.ok) throw Error("Request didn't go through");

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
