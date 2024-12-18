import toast from "react-hot-toast";
import { url } from "../../utils/CRUD";

async function makeTransfer(transferObj, jwtToken, type) {
  const modifiedTransferObj = {
    ...transferObj,
    type,
    amount: +transferObj.amount,
  };
  const response = await fetch(`${url}/transfers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(modifiedTransferObj),
  });
  //   {
  //     senderAccountNumber: "AC0676571542",
  //     receiverAccountName: "gracewalker",
  //     receiverAccountNumber: "AC3021837348 ",
  //     narration: "Payment for services rendered",
  //     amount: 100,
  //     type: "internal",
  //   }
  const result = await response.json();
  console.log(result);
  return result;
  if (result.error) {
    throw Error(result.error);
  }
}

export { makeTransfer };
