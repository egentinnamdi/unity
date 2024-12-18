import * as Yup from "yup";

export const requiredMsg = (f, t) =>
  `${f} field is ${!t?  "required" : "invalid"}`;
export const stringField = (fieldName, t) =>
  Yup.string().required(requiredMsg(fieldName, t));
export const numberField = (fieldName, t) =>
  Yup.number().required(requiredMsg(fieldName, t));

export const emailField = Yup.string()
  .email("Invalid email address")
  .required(requiredMsg("Email"));

const passwordField = Yup.string()
  .min(8, "Must be 8 characters or more")
  .required(requiredMsg("Password"));
// .matches(/[0-9]/, "Must contain at least one number")
// .matches(
//   /[!@#$%^&*(),.?":{}|<>]/,
//   "Must contain at least one special character"
// )

export const emailSchema = Yup.object({
  email: emailField,
});

export const loginSchema = Yup.object({
  email: emailField,
  password: passwordField,
});

export const resetPwdSchema = Yup.object({
  newPassword: passwordField,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required(requiredMsg("Confirm Password")),
});

export const registerSchema = Yup.object({
  username: stringField("Username"),
  phone: stringField("Phone"),
  email: emailField.required(requiredMsg("Email")),
  password: passwordField,
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});
