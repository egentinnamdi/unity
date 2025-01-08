import React from "react";
import { Box, Pagination, Paper } from "@mui/material";
import { colors } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../store/slices/miscellaneousSlice";
function TablePagination({ data }) {
  const { screenSize, page } = useSelector((state) => state.others);

  const dispatch = useDispatch();

  function handlePage(_, pageNum) {
    dispatch(updatePage({ page: pageNum }));
  }

  return (
    <Box className="flex h-28 items-end justify-center p-3">
      <Paper elevation={0} className="!rounded-2xl">
        <Pagination
          count={Math.ceil(data?.length / 5)}
          page={page}
          size={screenSize ? "small" : "large"}
          onChange={handlePage}
          // boundaryCount={}
          className="rounded-2xl border border-superNav p-4 !font-medium"
          sx={{
            "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
              color: "white",
              background: colors.superNav,
            },
            "& .MuiPaginationItem-root": {
              color: colors.superNav,
              fontWeight: 600,
              borderColor: colors.superNav,
              borderWidth: 1,
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default TablePagination;
