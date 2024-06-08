import React from "react";
import { Input } from "antd";

const FilterInput = ({ setValues, values, placeholder,filterValue }) => {
  return (
    <Input
      placeholder={placeholder}
      value={values[filterValue]}
      onChange={(e) => {
        setValues({
          ...values,
          [filterValue]: e.target.value,
        });
      }}
     className="w-32 p-2"
    />
  );
};
export default FilterInput;
