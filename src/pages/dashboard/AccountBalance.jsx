import { useSelector } from "react-redux";
import TotalBalance from "../../components/TotalBalance";

function AccountBalance() {
  const { screenSize } = useSelector((state) => state.others);

  return <TotalBalance screenSize={screenSize} />;
}

export default AccountBalance;
