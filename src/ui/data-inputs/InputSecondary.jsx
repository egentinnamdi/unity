import OTPInput from "react-otp-input";
import { colors } from "../../utils/config";
import { useUser } from "../../context/UserContext";

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

function InputSecondary({ length }) {
  const {
    transactPinState: [transactPin, setTransactPin],
  } = useUser();

  const handleChange = (value) => setTransactPin(value);
  return (
    <OTPInput
      value={transactPin}
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
