import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Button, Table, Tag } from "antd";
import { array } from "prop-types";

import { changeUsersStatus, customToast, handleUserActions } from "utils";
import { BlockIcon, TrashIcon, UnblockIcon } from "assets";
import { BASE_URI } from "constants";

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
    render: (time) => moment(time).format("DD MM YYYY, h:mm"),
  },
  {
    title: "Last Login at",
    dataIndex: "lastLogin",
    render: (time) => moment(time).format("DD MM YYYY, h:mm"),
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
        type: "block",
      },
      {
        icon: UnblockIcon,
        type: "unblock",
      },
      {
        icon: TrashIcon,
        type: "delete",
      },
    ];
  });
  const [selectedUsers, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: onSelectChange,
  };

  function deleteAllSelected() {
    selectedUsers.forEach((id) => {
      axios
        .delete(`${BASE_URI}user?id=${id}`)
        .then(({ data }) => {
          if (data.status === 404) {
            customToast("no", data.message);
          } else {
            const { _id } = JSON.parse(sessionStorage.getItem("user"));
            customToast("ok", data.message);
            if (id === _id) {
              sessionStorage.removeItem("user");
              location.assign("/register");
            }
          }
        })
        .catch((err) => console.error(err));
    });
  }

  return (
    <div className="table__container">
      {selectedUsers.length ? (
        <div className="table__actions__wrp">
          <button
            className="table__actions"
            onClick={deleteAllSelected}>
            <img className="icon" src={TrashIcon} alt="" />
          </button>
          <button
            className="table__actions"
            onClick={() => changeUsersStatus(selectedUsers.toString(), "unblock")}>
            <img className="icon" src={UnblockIcon} alt="" />
          </button>
          <button
            className="table__actions"
            onClick={() => changeUsersStatus(selectedUsers.toString(), "block")}>
            <img className="icon" src={BlockIcon} alt="" />
          </button>
        </div>
      ) : null}
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
