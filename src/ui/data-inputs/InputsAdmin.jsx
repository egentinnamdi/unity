import React from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { updateGlobalLoadingStatus } from "../../store/slices/miscellaneousSlice";
import { filterObject } from "../../utils/helpers";
import { updateTable } from "../../services/api/admin";
import { Box } from "@mui/material";
import BtnSecondary from "../buttons/BtnSecondary";
import Input from "./Input";

function InputsAdmin({
  id,
  setSaveDialog,
  initialValues,
  queryKey,
  path,
  isPost,
}) {
  const inpFields = Object.keys(initialValues);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      toast.success("Table updated successfully");
      queryClient.invalidateQueries(queryKey);
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      setSaveDialog(false);
      dispatch(updateGlobalLoadingStatus({ loading: false }));
    },
  });
  const formik = useFormik({
    initialValues,
    onSubmit: (formValues, { resetForm }) => {
      dispatch(updateGlobalLoadingStatus({ loading: true }));
      const modifiedObj = filterObject(formValues);
      mutate({ token, modifiedObj, id, path, isPost });
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="w-full grid-cols-2 grid-rows-2 gap-10 space-y-4 p-5 lg:grid lg:space-y-0">
        {inpFields.map((item) => {
          return (
            <Input
              required={isPost}
              name={item}
              key={item}
              label={item}
              formik={formik}
              variant="filled"
            />
          );
        })}
      </Box>
      <Box className="flex justify-end gap-5 lg:px-7 lg:pt-12">
        <BtnSecondary
          text="cancel"
          variant="outlined"
          onClick={() => setSaveDialog(false)}
        />
        <BtnSecondary text="save" type="submit" />
      </Box>
    </form>
  );
}

export default InputsAdmin;
