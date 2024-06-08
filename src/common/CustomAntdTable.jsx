import { Table, ConfigProvider } from "antd";

const CustomAntdTable = (props) => {
  const { dataSource, columns} = props;
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#F0F0F0",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
        scroll={{ x: 500 }}
      />
    </ConfigProvider>
  );
};

export default CustomAntdTable;
