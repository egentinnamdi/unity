import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { BaseButton } from "../../ui/buttons/BaseButton";
import { BaseInput } from "../../ui/data-inputs/text-input";
import { APPNAME } from "../../utils/constants";
import { RouterConstantUtil } from "../../utils/constants/RouterConstantUtils";
import { registerSchema } from "../../utils/validationSchemas/authSchema";
import { AuthLayout } from "../layout/AuthLayout";
import { cn, handleReqResErrors, handleToastNotifs } from "../../utils/helpers";
// import { AuthService } from "../../services/api/auth";
import { AssetsUtils } from "../../utils/AssetsUtils";
import { IoMdCheckmarkCircle } from "react-icons/io";

const RegistrationView = () => {
  document.title = `Register | ${APPNAME}`;
  const [isLoading, setIsloading] = useState(false);

  const initialValues = {
    username: "",
    phone: "",
    email: "",
    password: "",
    agreeTerms: false,
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setIsloading(true);
      console.log(values);
      // try {
      // const data = { ...values, agr: values.ag };
      // const { agreeTerms, ...data } = values;
      // const res = await AuthService.registerNewUser(data);

      // handleToastNotifs({
      //   type: "success",
      //   message: res.data.message || "Success",
      //   position: "top-right",
      //   duration: 3000,
      // });
      resetForm();
      // navigate(RouterConstantUtil.auth.login);
      // } catch (e) {
      //   handleReqResErrors(e);
      // } finally {
      //   setIsloading(false);
      // }
    },
  });

  return (
    <AuthLayout
      sideImg={AssetsUtils.images.signupSideImg}
      parentClassname={cn("overflow-y-auto max-md:items-start")}
    >
      <div className="flex w-full flex-col lg:h-full lg:max-w-md">
        <div className="mx-auto flex h-[90%] w-[90%] flex-col items-center overflow-y-auto sm:pb-16 lg:w-[80%]">
          <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-[25px] bg-[#EAEFF5]">
            <img className="w-auto" src={AssetsUtils.icons.wave} alt="wave" />
          </div>
          <h2 className="font-poppins mb-4 text-3xl font-semibold text-[#E60012]">
            Sign Up
          </h2>
          <form
            className="mt-6 w-full space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              name="username"
              onChange={formik.handleChange}
              error={formik.errors.username}
              value={formik.values.username}
              type="text"
              placeholder="Username"
              readOnly={isLoading}
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
              value={formik.values.email}
              type="email"
              readOnly={isLoading}
            />
            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              placeholder="Phone Number"
              name="phone"
              onChange={formik.handleChange}
              error={formik.errors.phone}
              value={formik.values.phone}
              type="tel"
              readOnly={isLoading}
            />

            <BaseInput
              inputContainerClassName="bg-[#F5F9FE] border-none  flex h-[60px] border-2 text-[#232323] font-gothic-bold text-[16px]"
              inputClassName="border-none pl-5 pr-2 w-full h-full text-black placeholder:text-[#7C8BA0] font-poppins text-md"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              placeholder="Password"
              readOnly={isLoading}
            />
            <div
              className={cn(
                "flex flex-col items-start justify-start pt-4",
                isLoading &&
                  "text-gray pointer-events-none select-none opacity-[.5]",
              )}
            >
              <div
                className={"flex flex-row items-start justify-start gap-2 px-2"}
              >
                <input
                  type="checkbox"
                  className="checkbox rounded-[5px] border-none bg-[#F5F9FE] md:h-[18px] md:w-[18px]"
                  id="agreeTerms"
                  checked={formik.values.agreeTerms}
                  name="agreeTerms"
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="agreeTerms"
                  className="label -mt-2 flex cursor-pointer items-center"
                >
                  <span
                    className={"font-poppins w-full text-xs text-[#3B4054]"}
                  >
                    I agree to the
                    <Link
                      to={RouterConstantUtil.page.termsAndConditions}
                      className="ml-1 cursor-pointer text-[#3461FD] underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and
                    <Link
                      to={RouterConstantUtil.page.privacyPolicy}
                      className="ml-1 cursor-pointer text-[#3461FD] underline"
                    >
                      Privacy<br></br> Policy
                    </Link>
                  </span>
                </label>
              </div>
              {formik.errors.agreeTerms && (
                <p className="flex items-center gap-2 text-sm leading-[15px] text-[red]">
                  <IoMdCheckmarkCircle /> {formik.errors.agreeTerms}
                </p>
              )}
            </div>
            <BaseButton
              hoverOpacity={0.9}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              type="submit"
              containerCLassName="bg-[#E60012] mt-10 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
              title={"Create Account"}
            />
            <p className={"font-poppins text-center text-sm text-[#3B4054]"}>
              Do you have account?{" "}
              <Link
                to={RouterConstantUtil.auth.login}
                className={cn(
                  "cursor-pointer text-[#3461FD]",
                  isLoading &&
                    "text-gray pointer-events-none select-none opacity-[.5]",
                )}
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationView;
