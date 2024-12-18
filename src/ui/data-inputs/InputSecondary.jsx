import OTPInput from "react-otp-input";
import { colors } from "../../utils/config";

const otpInputStyle = {
  fontSize: "2rem",
  width: "4rem",
  height: "4rem",
  margin: "0 0.2rem",
  fontSize: "1.5rem",
  textAlign: "center",
  background: colors.search,
  borderRadius: "10px",
};

function InputSecondary({ length, setTransactionPin, transactionPin }) {
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
