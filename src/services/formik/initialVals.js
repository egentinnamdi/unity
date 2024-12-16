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
  gender: "",
  email: "",
  phone: "",
  password: "",
  profilePicture: "",
  birthDate: "",
  transactionPin: "",
  taxCode: "",
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

export { userInitialVal, loanInitialVal, cardInitialVal, supportInitialVal };
