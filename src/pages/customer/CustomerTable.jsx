import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import getCustomers from "../services/customerService";
import { useQuery } from "react-query";

const CustomerTable = () => {
  let filters = { id: "1" };
  const { data } = useQuery("customer", getCustomers(filters));
  const customers = _.get(data, "customers") || [];
  const count = _.get(data, "count");

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

  return <Table columns={columns} dataSource={customers} />;
};
export default CustomerTable;
