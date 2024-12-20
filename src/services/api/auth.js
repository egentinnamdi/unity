import { url } from "../../utils/CRUD";

async function createPin({ token, id, transactionPin }) {
  const response = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ transactionPin }),
  });
  if (!response) throw Error("Request didn't go through");

  const pin = response.json();

  return pin;
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

async function verifyOtp(otpObj) {
  const response = await fetch(`${url}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(otpObj),
  });
  if (!response.ok) throw Error("Something went wrong, please try again");
  const otpVerified = await response.json();

  return otpVerified;
}

async function resetPassword(passObj) {
  const response = await fetch(`${url}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passObj),
  });
  if (!response.ok) throw Error("Something went wrong, please try again");
  const newPassword = response.json();
  return newPassword;
}

export { createPin, changePassword, verifyOtp, resetPassword };
