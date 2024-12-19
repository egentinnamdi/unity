// import { useLayoutEffect, useState } from "react";
// import { cn, handleReqResErrors } from "@/utils/helpers";

import { Link, useNavigate } from "react-router-dom";
import { APPNAME } from "../../utils/constants";
import { AuthLayout } from "../layout/AuthLayout";
import TopLine from "./topLine";
import { AssetsUtils } from "../../utils/AssetsUtils";
import { OtpInput } from "../../ui/data-inputs/OtpInput";
import { BaseButton } from "../../ui/buttons/BaseButton";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import { useMediaQuery } from "react-responsive";
import { cn } from "../../utils/helpers";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../services/api/auth";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PasswordResetOtp = () => {
  document.title = `Password Reset Otp | ${APPNAME}`;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfInputs] = useState(6);
  const auth = useSelector((state) => state.auth);

  const { mutate } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      console.log(data);
      if (!data.otp) throw Error("Incorrect OTP");
      navigate(RouterConstantUtil.auth.password_reset);
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => setIsLoading(false),
  });

  const [disableInputs] = useState(false);

  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  async function validateOtp() {
    if (otp.length == numberOfInputs) {
      try {
        const otpObj = { email: auth.email, otp };
        setIsLoading(true);
        mutate(otpObj);
      } catch (err) {
        throw Error(err.message);
      }
    }
  }

  return (
    <AuthLayout
      sideImageStyles={{
        backgroundSize: "contain",
        // backgroundSize: "55rem 55rem",
        backgroundPositionX: isTablet ? "1rem" : "5rem",
      }}
      sideImg={AssetsUtils.images.enterotpsideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex h-auto w-[90%] flex-col lg:max-w-md">
        <div className="relative mx-auto mt-32 flex w-full flex-col items-center lg:w-[80%]">
          <TopLine parentClassname="lg:-top-[10rem]" />{" "}
          <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-[25px] bg-[#EAEFF5]">
            <img className="w-" src={AssetsUtils.icons.claps} alt="wave" />
          </div>
          <h2 className="font-poppins mb-4 text-3xl font-semibold text-[#E60012]">
            Enter OTP
          </h2>
          <p className="font-poppins text-center text-sm text-[#61677D]">
            Enter the OTP code we just sent <br></br> you on your registered
            Email/Phone number
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center">
            <OtpInput
              numberOfInputs={numberOfInputs}
              containerClassname=""
              onChangeText={setOtp}
              otp={otp}
              disableInputs={disableInputs}
              inputClassname={
                "w-[48px] h-[62px] lg:text-lg border border-[#EAEFF5] bg-[#F5F9FE] rounded-[12px]"
              }
            />
            <BaseButton
              hoverOpacity={0.6}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              onClick={validateOtp}
              type="submit"
              title={"Submit"}
              containerCLassName="bg-[#E60012] mt-10 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
            />
            <p
              className={"font-poppins mt-5 text-center text-sm text-[#3B4054]"}
            >
              Didn't get OTP? {""}
              <Link
                to={RouterConstantUtil.auth.register}
                className={cn(
                  "cursor-pointer text-[#3461FD]",
                  //   logginIn &&
                  //     "text-gray pointer-events-none select-none opacity-[.5]"
                )}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordResetOtp;
