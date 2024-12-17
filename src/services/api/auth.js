import { Password } from "@mui/icons-material";
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

async function changePassword(passObj, jwtToken, id) {
  const response = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({ password: passObj }),
  });
  const result = await response.json();
  if (result.error) {
    throw Error(`${result.error}: ${result.statusCode}, ${result.message[0]}`);
  }
}

export { createPin, changePassword };
