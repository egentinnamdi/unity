import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/helpers";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";

const TopLine = ({ parentClassname }) => {
  const { pathname } = useLocation();

  const linesDetails = [
    {
      route: RouterConstantUtil.auth.forgot_password,
      back: RouterConstantUtil.auth.login,
    },
    {
      route: RouterConstantUtil.auth.password_reset_otp,
      back: RouterConstantUtil.auth.forgot_password,
    },
    {
      route: RouterConstantUtil.auth.password_reset,
      back: RouterConstantUtil.auth.password_reset_otp,
    },
  ];

  return (
    <div
      className={cn(
        "absolute -top-[10rem] z-[100] flex w-[90vw] flex-col items-start gap-12 lg:-top-[16rem] lg:w-[40vw] lg:max-w-[40vw]",
        parentClassname,
      )}
    >
      <Link
        to={
          pathname == RouterConstantUtil.auth.forgot_password
            ? RouterConstantUtil.auth.login
            : pathname == RouterConstantUtil.auth.password_reset_otp
              ? RouterConstantUtil.auth.forgot_password
              : RouterConstantUtil.auth.password_reset_otp
        }
      >
        <IoMdArrowBack className="text-3xl text-black" />
      </Link>
      <div className="mx-auto flex items-center gap-3">
        {linesDetails.map(({ route }, _idx) => (
          <div
            key={_idx}
            className={cn(
              "h-[4px] w-[32px] rounded-[2px] bg-[#D6DFFF]",
              pathname == route && "bg-[#3461FD]",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default TopLine;
