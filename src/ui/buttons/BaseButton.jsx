import React from "react";
import { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";
import { useSelector } from "react-redux";

export const BaseButton = ({
  children,
  containerCLassName,
  contClassName,
  onClick,
  background,
  hoverScale = 1.02,
  hoverOpacity = 0.9,
  isSubmitting,
  icon,
  tapScale = 0.9,
  disabled,
  title,
  type = "submit",
}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <motion.button
      whileHover={{
        scale: hoverScale,
        opacity: hoverOpacity,
        transition: { duration: 0.1 },
      }}
      disabled={auth.isLoading}
      style={{ backgroundColor: `${background}`, opacity: disabled ? 0.3 : 1 }}
      whileTap={{ scale: tapScale, borderRadius: "15px" }}
      className={cn(
        "flex h-[45px] cursor-pointer select-none items-center justify-center rounded-[12px] p-[10px] text-center",
        disabled && "pointer-events-none",
        containerCLassName,
      )}
      onClick={onClick}
      type={type}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <div className={cn("gap- flex items-center", contClassName)}>
          {icon}
          {title || children}
        </div>
      )}
    </motion.button>
  );
};
