import { url } from "../../utils/CRUD";

async function createPin(transactionPin, jwtToken, id) {
  const response = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({ transactionPin }),
  });
  const updated = response.json();
  console.log(updated);

  return updated;
}

export { createPin };
