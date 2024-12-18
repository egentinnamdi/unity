import { url } from "../../utils/CRUD";

async function getWalletBalances(jwtToken) {
  const response = await fetch(`${url}/wallets/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const balances = await response.json();
  console.log(balances);
  return balances;
}

export { getWalletBalances };
