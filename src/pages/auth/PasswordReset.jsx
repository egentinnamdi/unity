import { useFormik } from "formik";
import { resetPwdSchema } from "../../utils/validationSchemas/authSchema";
import { AuthLayout } from "../layout/AuthLayout";
import { AssetsUtils } from "../../utils/AssetsUtils";
import TopLine from "./topLine";
import { BaseInput } from "../../ui/data-inputs/text-input";
import { BaseButton } from "../../ui/buttons/BaseButton";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { APPNAME } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/api/auth";
import toast from "react-hot-toast";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import { useSelector } from "react-redux";

const PasswordReset = () => {
  document.title = `Password Reset | ${APPNAME}`;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (!data.change) {
        navigate(RouterConstantUtil.auth.forgot_password);
        throw Error("Password wasn't changed, please try again");
      }
      toast.success("Password successfully changed");
      navigate(RouterConstantUtil.auth.login);
    },
    onError: (err) => {
      navigate(RouterConstantUtil.auth.forgot_password);
      toast.error(err.message);
    },
    onSettled: () => setIsLoading(false),
  });

  const initialValues = {
    newPassword: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPwdSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      const resetPassObj = {
        email: auth.email,
        otp: auth.otp,
        password: values.confirm_password,
      };
      setIsLoading(true);
      mutate(resetPassObj);

      resetForm();
    },
  });

  // useLayoutEffect(() => {
  //   if (pwdResetDetails?.email && pwdResetDetails?.otp) {
  //     setSearchParams((params) => {
  //       params.set("email", pwdResetDetails?.email);
  //       params.set("otp", pwdResetDetails?.otp);
  //       return params;
  //     });
  //   } else {
  //     navigate(RouterConstantUtil.auth.forgot_password);
  //   }
  // }, []);

  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  return (
    <AuthLayout
      sideImageStyles={{
        backgroundSize: "contain",
        // backgroundSize: "55rem 50rem",
        backgroundPositionX: isTablet ? "1rem" : "5rem",
      }}
      sideImg={AssetsUtils.images.resetPwdSideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex h-auto w-[90%] flex-col lg:max-w-md">
        <div className="mt-30 relative mx-auto flex w-full flex-col items-center lg:w-[80%]">
          <TopLine parentClassname="lg:-top-[10rem]" />{" "}
          <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-[25px] bg-[#EAEFF5]">
            <img className="w-" src={AssetsUtils.icons.lock} alt="lock" />
          </div>
          <h2 className="font-poppins mb-4 text-3xl font-semibold text-[#E60012]">
            Reset Password
          </h2>
          <form className="mt-8 w-full" onSubmit={formik.handleSubmit}>
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex pr-5 h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="newPassword"
              onChange={formik.handleChange}
              error={formik.errors.newPassword}
              value={formik.values.newPassword}
              readOnly={isLoading}
              placeholder="New Password"
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] mt-4 border-none  flex pr-5 h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="confirm_password"
              onChange={formik.handleChange}
              error={formik.errors.confirm_password}
              value={formik.values.confirm_password}
              readOnly={isLoading}
              placeholder="Confirm Password"
            />
            <BaseButton
              hoverOpacity={0.9}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              containerCLassName="bg-[#E60012] mt-7 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
              title={"Reset"}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordReset;
