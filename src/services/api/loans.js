import { url } from "../../utils/CRUD";

async function createLoan(loanFieldsObj, jwtToken) {
  const res = await fetch(`${url}/loans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(loanFieldsObj),
  });

  const data = res.json();

  return data;
}

export { createLoan };
