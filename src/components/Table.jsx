import { useState } from "react";
import { Button, Table, Tag } from "antd";
import { array } from "prop-types";

import { handleUserActions } from "utils";
import { BlockIcon, TrashIcon, UnblockIcon } from "assets";
import moment from "moment/moment";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Registered at",
    dataIndex: "createdAt",
    render: (time) => moment(time).format("DD MM YYYY, h:mm")
  },
  {
    title: "Last Login at",
    dataIndex: "lastLogin",
    render: (time) => moment(time).format("DD MM YYYY, h:mm")
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) =>
      status === "active" ? (
        <Tag color="green">{status}</Tag>
      ) : (
        <Tag color="red">{status}</Tag>
      ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (actions) =>
      actions?.map(({ icon, type }, inx) => (
        <Button
          key={inx}
          onClick={({ target }) => {
            const userId =
              target.parentElement.parentElement.parentElement?.attributes[
                "data-row-key"
              ]?.nodeValue;
            handleUserActions(userId, type);
          }}
          type="normal"
        >
          <img className="icon" src={icon} alt={type + " icon"} />
        </Button>
      )),
  },
];

const CustomTable = ({ data }) => {
  data?.map((user) => {
    user.actions = [
      {
        icon: BlockIcon,
        type: "status",
      },
      {
        icon: UnblockIcon,
        type: "status",
      },
      {
        icon: TrashIcon,
        type: "delete",
      },
    ];
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="table__container">
      <Table
        rowKey={(user) => user._id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};
export default CustomTable;

CustomTable.propTypes = {
  data: array.isRequired,
};
