import React from "react";
import { MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DescriptionOutlined } from "@mui/icons-material";

function ViewReceipt({ id, role }) {
  return (
    <Link to={`/transaction-receipt/${role}/${id}`} className="block">
      <MenuItem className="!text-gray-600">
        <DescriptionOutlined />
        <Typography className="pl-1 capitalize">view receipt</Typography>
      </MenuItem>
    </Link>
  );
}

export default ViewReceipt;
