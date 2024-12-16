import { url } from "../../utils/CRUD";

async function getWalletBalances(jwtToken) {
  const response = await fetch(`${url}/wallets/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const balances = await response.json();
  return balances;
}

export { getWalletBalances };
