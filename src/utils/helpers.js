import clsx from "clsx";
import toast from "react-hot-toast";
// import { store } from "@/services/store/index";
// import { logout, resetAuthState } from "@/services/store/slices/authSlice";
// import { resetUserSlice } from "@/services/store/slices/userSlice";
// import { RouterConstantUtil } from "../utils/constants/RouterConstantUtils";
import { twMerge } from "tailwind-merge";

export function filterObject(formValues) {
  const receiverAccountName = formValues?.receiverAccountName.toLowerCase();
  let createdAt;
  const modifiedObj = Object.fromEntries(
    Object.entries(formValues).filter(([key, value]) => Boolean(value)),
  );

  if (formValues.createdAt) {
    const { year, month, day, hour, minute, second } = formValues.createdAt;
    createdAt = `${year}-${month.toString().length === 1 ? "0" : ""}${month}-${day.toString().length === 1 ? "0" : ""}${day}T0${hour}:0${minute}:0${second}Z`;

    return { ...modifiedObj, createdAt, receiverAccountName };
  }
  return { ...modifiedObj, receiverAccountName };
}

export function handleLoggingOutState(isLoggingOut) {
  const focusableElements = document.querySelectorAll(
    "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])",
  );

  if (isLoggingOut) {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    focusableElements.forEach((el) => {
      el.setAttribute("data-original-tabindex", el?.getAttribute("tabindex"));
      el.setAttribute("tabindex", "-1");
    });
  } else {
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";

    focusableElements.forEach((el) => {
      const originalTabIndex = el.getAttribute("data-original-tabindex");
      if (originalTabIndex) {
        el.setAttribute("tabindex", originalTabIndex);
        el.removeAttribute("data-original-tabindex");
      } else {
        el.removeAttribute("tabindex");
      }
    });
  }
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserId() {
  return store.getState()?.auth?.u_data?.user?.id;
}

export const topScroll = (duration) => {
  const start = window.pageYOffset;
  const target = 0;
  const startTime = performance.now();

  function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, easeInOutQuad(start, target, progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  function easeInOutQuad(start, end, progress) {
    return start + (end - start) * progress * (3 - 2 * progress);
  }

  requestAnimationFrame(step);
};

export function handleToastNotifs({
  type,
  message,
  id,
  position = "top-center",
  duration,
  dark,
}) {
  toast[type](message, {
    id,
    duration: duration || 10000,
    position: position || "top-right",

    // Styling
    style: dark
      ? {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        }
      : {},
    className: "",

    // Custom Icon
    // icon: "👏",

    // Change colors of success/error/loading icon
    // iconTheme: {
    //   primary: "green",
    //   secondary: "#fff",
    // },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
}

export function handleReqResErrors(e, message, position) {
  handleToastNotifs({
    type: "error",
    position: position || "top-center",
    id: "error",
    message:
      message ||
      e?.response?.data?.message ||
      e?.response?.data?.error ||
      e?.message ||
      "An error occured",
    duration: 4000,
  });
  // if (e?.response?.status == 403) {
  //   store.dispatch(resetAuthState());
  // }
}
