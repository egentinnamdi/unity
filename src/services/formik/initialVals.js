const loanInitialVal = {
  accountNumber: "",
  loanAmount: 0,
  transactionMode: "",
  duration: "",
  purpose: "",
};
const userInitialVal = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  gender: "",
  phone: "",
  birthDate: "",
  location: "",
};

const cardInitialVal = {
  cardName: "",
  cardIssuer: "",
  cardType: "",
};

const supportInitialVal = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  priority: "low",
};

const transferInitialVal = {
  senderAccountNumber: "",
  receiverAccountName: "",
  receiverAccountNumber: "",
  receiverBankName: "",
  narration: "",
  amount: "",
  routingNumber: "",
  type: "",
};

export {
  userInitialVal,
  loanInitialVal,
  cardInitialVal,
  supportInitialVal,
  transferInitialVal,
};
