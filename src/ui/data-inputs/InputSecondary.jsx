import OTPInput from "react-otp-input";
import { colors } from "../../utils/config";
import { useState } from "react";

const otpInputStyle = {
  width: "4rem",
  height: "4rem",
  margin: "0 0.2rem",
  fontSize: "1.5rem",
  textAlign: "center",
  background: colors.search,
  borderRadius: "10px",
};

function InputSecondary({ length, setTransactionPin, transactionPin }) {
  // const [transactionPin, setTransactionPin] = useState();
  const handleChange = (value) => setTransactionPin(value);
  return (
    <OTPInput
      value={transactionPin}
      numInputs={length}
      onChange={handleChange}
      renderSeparator={<span> </span>}
      inputStyle={otpInputStyle}
      renderInput={(props) => {
        return <input className="" {...props} />;
      }}
    />
  );
}

export default InputSecondary;
