import { BaseButton } from "../../ui/buttons/BaseButton";
import { BaseInput } from "../../ui/data-inputs/text-input";
// import { AppDispatch, RootState } from "@/services/store";
// import { login } from "@/services/store/slices/authSlice";
import { APPNAME } from "../../utils/constants";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import { cn, handleToastNotifs } from "../../utils/helpers";
import { loginSchema } from "../../utils/validationSchemas/authSchema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
// import toast from "react-hot-toast";
import { AssetsUtils } from "../../utils/AssetsUtils";

const LoginView = () => {
  document.title = `Login | ${APPNAME}`;
  // const [searchParams] = useSearchParams();

  const [initialValues] = useState({
    email: "",
    password: "",
  });

  // const dispatch: AppDispatch = useDispatch();
  // const logginIn = useSelector((state: RootState) => state.auth.logginIn);
  const logginIn = false;

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        ...values,
      };
      console.log(data);
      // dispatch(login(data))
      //   .unwrap()
      //   .then(() => {
      //     resetForm();
      //   });
    },
  });

  // useEffect(() => {
  //   toast.dismiss();
  //   const errorMsg = searchParams.get("message");

  //   if (errorMsg) {
  //     handleToastNotifs({
  //       type: "error",
  //       id: "error",
  //       position: "top-center",
  //       message: errorMsg,
  //     });
  //   }
  // }, []);

  return (
    <AuthLayout
      sideImg={AssetsUtils.images.signinSideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex h-auto w-[90%] flex-col lg:max-w-md">
        <div className="w- flex w-full flex-col items-center lg:w-[80%]">
          <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-[25px] bg-[#EAEFF5]">
            <img className="w-" src={AssetsUtils.icons.wave} alt="wave" />
          </div>
          <h2 className="font-poppins mb-4 text-3xl font-semibold text-[#E60012]">
            Sign In
          </h2>
          <form
            className="mt-6 w-full space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              name="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
              readOnly={logginIn}
              type="email"
              placeholder="Email"
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] pr-5 border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
              value={formik.values.password}
              readOnly={logginIn}
              placeholder="Password"
            />
            <div
              className={cn(
                "-mt-2 flex flex-row flex-wrap items-center justify-end gap-2 px-4 pb-4",
                logginIn &&
                  "text-gray pointer-events-none select-none opacity-[.5]",
              )}
            >
              <Link
                className={cn(
                  "font-poppins text-xs text-[#7C8BA0]",
                  logginIn &&
                    "text-gray pointer-events-none select-none opacity-[.5]",
                )}
                to={RouterConstantUtil.auth.forgot_password}
              >
                Forget password?
              </Link>
            </div>
            <BaseButton
              hoverOpacity={0.6}
              hoverScale={1}
              isSubmitting={logginIn}
              disabled={logginIn}
              type="submit"
              title={"Log In"}
              containerCLassName="bg-[#E60012] mt-10 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
            />
            <p className={"font-poppins text-center text-sm text-[#3B4054]"}>
              Don’t have account? {""}
              <Link
                to={RouterConstantUtil.auth.register}
                className={cn(
                  "cursor-pointer text-[#3461FD]",
                  logginIn &&
                    "text-gray pointer-events-none select-none opacity-[.5]",
                )}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
