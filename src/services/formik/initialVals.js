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
  email: "",
  gender: "",
  phone: "",
  birthdate: null,
};
const changePassInitialVal = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
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
  transferObj: {},
};
const internalInitialVal = {
  senderAccountNumber: "",
  receiverAccountNumber: "",
  receiverAccountName: "",
  amount: "",
  narration: "",
  type: "",
};
const otherInitialVal = {
  senderAccountNumber: "",
  receiverAccountNumber: "",
  receiverAccountName: "",
  receiverBankName: "",
  amount: "",
  narration: "",
  type: "",
};
const internationalInitialVal = {
  senderAccountNumber: "",
  receiverAccountName: "",
  receiverAccountNumber: "",
  receiverBankName: "",
  routingNumber: "",
  amount: "",
  narration: "",
  type: "",
};

export {
  userInitialVal,
  loanInitialVal,
  cardInitialVal,
  supportInitialVal,
  internalInitialVal,
  internationalInitialVal,
  otherInitialVal,
  changePassInitialVal,
};
