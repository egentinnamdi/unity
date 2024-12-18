// import { useNavigate } from "react-router-dom";
// import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
// import { useState } from "react";
// import { handleReqResErrors, handleToastNotifs } from "@/utils/helpers";
// import { AuthService } from "@/services/api/auth";

import { useFormik } from "formik";
import { useMediaQuery } from "react-responsive";
import { AuthLayout } from "../layout/AuthLayout";
import { AssetsUtils } from "../../utils/AssetsUtils";
import { BaseInput } from "../../ui/data-inputs/text-input";
import { emailSchema } from "../../utils/validationSchemas/authSchema";
import { APPNAME } from "../../utils/constants";
import { BaseButton } from "../../ui/buttons/BaseButton";
import TopLine from "./topLine";
import { useState } from "react";

const ForgotPasswordView = () => {
  document.title = `Forget Password | ${APPNAME}`;
  const [isLoading, setIsloading] = useState(false);

  // const navigate = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      setIsloading(true);
      console.log(values);
      //   // try {
      //   //   const data = { ...values };

      //   //   const res = await AuthService.initialiseForgotPassword(data);

      //   //   handleToastNotifs({
      //   //     type: "success",
      //   //     message:
      //   //       res.data.message + ". Please vist your email to get token" ||
      //   //       "Success",
      //   //     position: "top-right",
      //   //     duration: 5000,
      //   //   });

      //   //   dispatch(updatePwdResetDetails({ email: values.email }));

      //     resetForm();
      //     navigate(RouterConstantUtil.auth.password_reset_otp);

      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     // @ts-ignore
      //   } catch (e: ICustomError) {
      //     handleReqResErrors(e, "", "bottom-center");
      //   } finally {
      //     setIsloading(false);
      //   }
    },
  });

  const isTablet = useMediaQuery({ query: "(max-width: 1440px)" });

  return (
    <AuthLayout
      sideImageStyles={{
        backgroundSize: "contain",
        // backgroundSize: "55rem 50rem",
        backgroundPositionX: isTablet ? "1rem" : "5rem",
      }}
      sideImg={AssetsUtils.images.forgetpasswordSideImg}
      parentClassname="items-start md:pt-9 overflow-y-hidden"
    >
      <div className="flex h-auto w-[90%] flex-col lg:max-w-md">
        <div className="relative mx-auto mt-32 flex w-full flex-col items-center lg:w-[80%]">
          <TopLine />{" "}
          <div className="mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-[25px] bg-[#EAEFF5]">
            <img className="w-" src={AssetsUtils.icons.claps} alt="wave" />
          </div>
          <h2 className="font-poppins mb-4 text-3xl font-semibold text-[#E60012]">
            Forget Password
          </h2>
          <form className="mt-8 w-full" onSubmit={formik.handleSubmit}>
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
            <BaseButton
              hoverOpacity={0.9}
              hoverScale={1}
              isSubmitting={isLoading}
              disabled={isLoading}
              containerCLassName="bg-[#E60012] mt-7 rounded-[14px] w-full h-[60px] py-[24px] font-medium font-poppins text-[16px] text-[#fff] shadow-[rgba(230,0,18,0.5)_0px_5px_10px_0px]"
              title={"Continue"}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordView;
