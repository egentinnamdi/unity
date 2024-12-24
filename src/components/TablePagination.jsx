import { Box, Pagination, Paper } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../utils/config";
import { useSelector } from "react-redux";
function TablePagination() {
  const [page, setPage] = useState();
  const { screenSize } = useSelector((state) => state.others);

  return (
    <Box className="flex h-28 items-end justify-center p-3">
      <Paper elevation={4} className="!rounded-2xl">
        <Pagination
          count={screenSize ? 4 : 8}
          page={page}
          size={screenSize ? "medium" : "large"}
          onChange={() => setPage((prev) => prev + 1)}
          // boundaryCount={}
          className="rounded-2xl border border-superNav p-4 !font-medium"
          classes={{ ul: " " }}
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
