import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import getCustomers from "../services/customerService";
import QueryParams from "../../lib/hooks/QueryParams";
import { removeDuplicates } from "../../utils/utils";
import FilterUtils from "../../utils/filterUtils";
import FilterInput from "./FilterTextField";
import FilterDropDown from "./FilterDropDown";
import { IoSearch } from "react-icons/io5";
import { VscRefresh } from "react-icons/vsc";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import CustomAntdTable from "../../common/CustomAntdTable";

const CustomerTable = () => {
  let { pageNo, cgid, name, mobile, email, recordStatus } = QueryParams();
  const navigateTo = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    pageNo: pageNo || 1,
    pageSize: rowsPerPage,
  });
  const [values, setValues] = useState({
    name,
    cgid,
    mobile,
    email,
    recordStatus,
  });

  /**
   * Fetch call to get customers
   */
  const { data } = useQuery(
    ["customer", cgid, name, mobile, email, recordStatus, filters],
    () => getCustomers(filters),
    {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );

  const customers = _.get(data, "customers") || [];
  const count = _.get(data, "count");

  /***
   *
   * Keep filters consistent even after page refresh
   */
  useEffect(() => {
    if (cgid || name || mobile || email || recordStatus) {
      let params = {
        cgid,
        name,
        mobile,
        email,
        recordStatus,
      };
      const newParams = removeDuplicates(params);
      setFilters({
        ...filters,
        ...newParams,
      });
    }
  }, [cgid, name, mobile, email, recordStatus]);

  /**
   * If route is not following pageNo and then add it forcefully in order to set pageNo
   */
  useEffect(() => {
    if (!pageNo) {
      pageNo = 1;
      handlePageChange({ current: pageNo, pageSize: rowsPerPage });
    }
  }, [pageNo]);

  /**
   * Handle pagination change
   */
  const handlePageChange = (updatePage) => {
    if (!_.isEmpty(updatePage)) {
      let params = {
        pageNo: updatePage ? updatePage.current : 1,
      };
      navigateTo(FilterUtils.createUrl(params));

      if (
        updatePage.pageSize !== rowsPerPage ||
        updatePage.current !== pageNo
      ) {
        setRowsPerPage(updatePage.pageSize);
        setFilters({
          ...filters,
          pageNo: updatePage.current,
          pageSize: updatePage.pageSize,
        });
      }
    }
  };

  /**
   * Filter reset function
   */
  const onReset = () => {
    setFilters({ pageNo: 1, pageSize: 10 });
    setValues({});
    navigateTo("/customer");
  };

  /**
   * Filter function
   *  */
  const onFilter = () => {
    let params = {
      ...filters,
      ...values,
    };
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
      render: (row) => {
        return row ? (
          <IoMdCheckmarkCircle size={18} color="green" />
        ) : (
          <IoMdCloseCircle size={18} color="red" />
        );
      },
    },
  ];

  return (
    <div className="content">
      <div className="px-10">
        <div className="flex flex-row justify-between pb-12">
          <h3 className="text-3xl">Customer</h3>
          <div className="text-lg order-last bg-[#ffed00] py-0.5 px-4 text-purple-800">
            + Create
          </div>
        </div>
        <div className="flex flex-row p-3 bg-[#ffffff] justify-between">
          <div className="flex flex-row gap-3">
            <FilterInput
              values={values}
              setValues={setValues}
              placeholder={"CG ID"}
              filterValue={"cgid"}
              onFilter={onFilter}
            />
            <FilterInput
              values={values}
              setValues={setValues}
              placeholder={"Name"}
              filterValue={"name"}
              onFilter={onFilter}
            />

            <FilterInput
              values={values}
              setValues={setValues}
              placeholder={"Dial Code"}
              filterValue={"dialCode"}
              onFilter={onFilter}
            />

            <FilterInput
              values={values}
              setValues={setValues}
              placeholder={"Mobile"}
              filterValue={"mobile"}
              onFilter={onFilter}
            />

            <FilterInput
              values={values}
              setValues={setValues}
              placeholder={"Email"}
              filterValue={"email"}
              onFilter={onFilter}
            />
            <FilterDropDown
              values={values}
              setValues={setValues}
              placeholder={"Status"}
              filterValue={"recordStatus"}
            />
          </div>
          <div className="flex flex-row order-last gap-6">
            <IoSearch size={24} onClick={() => onFilter()} />
            <VscRefresh size={24} onClick={() => onReset()} />
          </div>
        </div>
        <CustomAntdTable
          columns={columns}
          dataSource={customers}
          pagination={false}
        />
        <Pagination
          total={count}
          current={pageNo}
          pageSize={rowsPerPage}
          showSizeChanger={true}
          showTotal={(total, range) => `Total: ${total}`}
          onChange={(page, pageSize) => {
            handlePageChange({ current: page, pageSize: pageSize });
          }}
          className="flex justify-end p-4 bg-[#ffffff]"
        />
      </div>
    </div>
  );
};
export default CustomerTable;
