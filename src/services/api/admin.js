import { url } from "../../utils/CRUD";

export async function getSupportTable(token, id) {
  const response = await fetch(`${url}/support/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw Error("Admin support table could not be fetched, please try again");
  }
  const supportTable = response.json();
  return supportTable;
}

export async function getTransfersTable() {}
export async function getTransfersTable() {}
export async function getTransfersTable() {}
