import { Button, Table, Typography, Modal } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { likeMap, multipleSelectMap, priorityMap } from "../constant";
import {
  deleteTodoListItem,
  setUuidFromTable,
  setEditFormTrigger,
  setViewFormTrigger,
  initTodoList,
} from "../redux/store";
const { Title } = Typography;

const TodoTable = (props) => {
  const [title, setTitle] = useState("全部資料");
  const [modalText, setModalText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let handleModalOk = null;

  const { initTodoList } = props

  useEffect(() => {
    let todoListString = localStorage.getItem("todoListData");
    let todoList = null;
    if (!todoListString) {
      todoList = {};
    } else {
      todoList = JSON.parse(todoListString);
      initTodoList(todoList);
    }
    return () => { };
  }, [initTodoList]);

  useEffect(() => {
    if (props.searchResultList === null) {
      setTitle("全部資料");
    } else {
      if (Object.keys(props.searchResultList).length === 0) {
        setTitle("查無資料");
      } else {
        setTitle("搜尋結果");
      }
    }
  }, [props.searchResultList]);

  let onEditBtnClick = (uuid) => {
    props.setUuidFromTable(uuid);
    props.setEditFormTrigger(true);
  };

  let onDeleteBtnClick = (uuid) => {
    showModal("確定要刪除該筆資料嗎?", () => {
      props.deleteTodoListItem(uuid);
    });
  };

  let onViewBtnClick = (uuid) => {
    props.setUuidFromTable(uuid);
    props.setViewFormTrigger(true);
  };

  let getDataSource = () => {
    let tableTodoList = {};
    if (props.searchResultList === null) {
      tableTodoList = props.todoList;
    } else {
      tableTodoList = props.searchResultList;
    }

    let dataSource = [];
    Object.keys(tableTodoList).forEach((key, index) => {
      let obj = { ...tableTodoList[key] };

      obj["datePickerString"] = obj["datePickerString"]
        ? obj["datePickerString"]
        : "-";
      obj["timePickerString"] = obj["timePickerString"]
        ? obj["timePickerString"]
        : "-";
      obj["selectValue"] = obj["selectValue"]
        ? priorityMap[obj["selectValue"]]
        : "-";
      obj["radioValue"] = obj["radioValue"] ? likeMap[obj["radioValue"]] : "-";
      obj["switchValue"] = obj["switchValue"] ? "已完成" : "未完成";
      obj["multipleSelectValue"] = obj["multipleSelectValue"].length
        ? obj["multipleSelectValue"].map((val) => {
          return `${multipleSelectMap[val]} `;
        })
        : "-";

      obj["key"] = index;
      obj["action"] = (
        <div>
          <Button
            id={obj["uuid"]}
            htmlType="button"
            onClick={() => {
              onEditBtnClick(obj["uuid"]);
            }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            id={obj["uuid"]}
            type="danger"
            htmlType="button"
            onClick={() => {
              onDeleteBtnClick(obj["uuid"]);
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            id={obj["uuid"]}
            htmlType="button"
            onClick={() => {
              onViewBtnClick(obj["uuid"]);
            }}
          >
            View
          </Button>
        </div>
      );

      dataSource[index] = obj;
    });
    return dataSource;
  };

  let handleModalCancel = () => {
    setModalVisible(false);
  };

  let showModal = (modalText, modalOKCallback) => {
    setModalVisible(true);
    setModalText(modalText);
    handleModalOk = modalOKCallback;
  };

  const columns = [
    {
      title: "事件",
      dataIndex: "inputTextValue",
      key: "inputTextValue",
    },
    {
      title: "緊急程度",
      dataIndex: "selectValue",
      key: "selectValue",
    },
    {
      title: "多重選擇",
      dataIndex: "multipleSelectValue",
      key: "multipleSelectValue",
    },
    {
      title: "喜好",
      dataIndex: "radioValue",
      key: "radioValue",
    },
    {
      title: "日期",
      dataIndex: "datePickerString",
      key: "datePickerString",
    },
    {
      title: "時間",
      dataIndex: "timePickerString",
      key: "timePickerString",
    },
    {
      title: "是否完成",
      dataIndex: "switchValue",
      key: "switchValue",
    },
    {
      title: "動作",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      <Title>{title}</Title>
      <Table dataSource={getDataSource()} columns={columns} />
      <Modal
        title="Confirm"
        visible={modalVisible}
        onOk={() => {
          if (handleModalOk) {
            setModalVisible(false);
            handleModalOk();
          }
        }}
        onCancel={handleModalCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  deleteTodoListItem,
  setUuidFromTable,
  setEditFormTrigger,
  setViewFormTrigger,
  initTodoList,
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    searchResultList: state.searchResultList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
