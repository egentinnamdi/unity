import TotalBalance from "../../components/TotalBalance";
import { AuthLayout } from "../layout/AuthLayout";

function AccountBalance({ screenSize }) {
  return (
    <AuthLayout>
      <TotalBalance screenSize={screenSize} />;
    </AuthLayout>
  );
}

export default AccountBalance;
