import toast from "react-hot-toast";
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
  if (!response.ok) throw Error("something went wrong");
  const result = await response.json();
  toast.success("successful");
  console.log(result);
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
