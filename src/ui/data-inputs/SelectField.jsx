import { MenuItem, Select } from "@mui/material";

function SelectField({ options, name, label, formik, variant }) {
  return (
    <Select
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      variant={variant}
      className="w-full !rounded-lg !bg-white capitalize !text-primary"
      label={label}
    >
      {options.map((item) => (
        <MenuItem className="capitalize" value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectField;
