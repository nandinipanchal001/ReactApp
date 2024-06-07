import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Space, Table, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import getCustomers from "../services/customerService";
import { useQuery } from "react-query";
import QueryParams from "../../lib/hooks/QueryParams";
import FilterUtils from "../../utils/filterUtils";
import FilterInput from "./FIlterTextField";

const CustomerTable = () => {
  let { cgid, name, mobile, email } = QueryParams();
  const navigateTo = useNavigate();
  const [filters, setFilters] = useState({ pageNo: 1, pageSize: 50 });
  const [values, setValues] = useState({ name, cgid, mobile, email });

  const { data } = useQuery(["customer", cgid, name, mobile, email], () =>
    getCustomers(filters)
  );

  const customers = _.get(data, "customers") || [];
  //   const count = _.get(data, "count");

  //   console.log("pageSize", filters,values);

  const onReset = () => {
    setFilters({ pageNo: 1, pageSize: 50 });
    setValues({});
    navigateTo("/customer");
  };

  const onFilter = () => {
    let params = {
      ...filters,
      ...values,
    };
    console.log("params", params);
    setFilters(params);
    navigateTo(FilterUtils.createUrl(params));
  };

  const columns = [
    {
      title: "CGID",
      dataIndex: "cgId",
      key: "cgId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Dial Code",
      dataIndex: "dialCode",
      key: "dialCode",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "recordStatus",
      key: "recordStatus",
    },
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FilterInput
            values={values}
            setValues={setValues}
            placeholder={"CG ID"}
            filterValue={"cgid"}
          />
          <FilterInput
            values={values}
            setValues={setValues}
            placeholder={"Name"}
            filterValue={"name"}
          />

          <Input
            placeholder="Dial Code"
            onChange={(e) => {
              // setFilters({
              //     ...filters,
              //     cgid:e.target.value
              // })
            }}
          />
          <FilterInput
            values={values}
            setValues={setValues}
            placeholder={"Mobile"}
            filterValue={"mobile"}
          />

          <FilterInput
            values={values}
            setValues={setValues}
            placeholder={"Email"}
            filterValue={"email"}
          />
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <button onClick={() => onFilter()}>search</button>
          <button onClick={() => onReset()}>reeset</button>
        </div>
      </div>
      <Table columns={columns} dataSource={customers} />;
    </>
  );
};
export default CustomerTable;
