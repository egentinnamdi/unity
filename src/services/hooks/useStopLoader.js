import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveUserDataStatus } from "../../store/slices/miscellaneousSlice";

export function useStopLoader() {
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(
      retrieveUserDataStatus({
        isFetchingBalance: false,
        isFetchingUser: false,
      }),
    );
  }, []);
}
