import React, { useEffect, useState } from "react";
import { Select } from "antd";

const FilterDropDown = ({ setValues, values, placeholder, filterValue }) => {
  const [value, setValue] = useState(null);
  let options = [
    {
      value: true,
      label: "Verified",
    },
    {
      value: false,
      label: "Unverified",
    },
  ];

  useEffect(() => {
    if (typeof values[filterValue] == "boolean") {
      if (values[filterValue]) {
        setValue(true);
      } else {
        setValue(false);
      }
    }else{
        setValue(null)
    }
  }, [values]);

  return (
    <Select
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={(value) => {
        setValues({
          ...values,
          [filterValue]: value,
        });
      }}
      className="w-32 h-auto"
    />
  );
};
export default FilterDropDown;
