import { Button, Table } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodoListItem } from "../redux/store";

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onEditBtnClick = (uuid) => {
    console.log(uuid);
  };

  onDeleteBtnClick = (uuid) => {
    this.props.deleteTodoListItem(uuid);
  };

  getDataSource() {
    let priorityMap = {
      1: "普通",
      2: "重要",
      3: "緊急",
    };

    let multipleSelectMap = {
      1: "Red",
      2: "Green",
      3: "Blue",
    };

    let todoList = {};
    if (this.props.todoList) {
      todoList = this.props.todoList;
    }
    let dataSource = [];
    Object.keys(todoList).forEach((key, index) => {
      let obj = { ...todoList[key] };
      obj["selectValue"] = priorityMap[obj["selectValue"]];
      obj["radioValue"] = priorityMap[obj["radioValue"]];
      obj["switchValue"] = obj["switchValue"] ? "已完成" : "未完成";
      if (obj["multipleSelectValue"].length !== 0) {
        let multipleSelectStr = "";
        for (let i = 1; i <= 3; i++) {
          if (obj["multipleSelectValue"].includes(i)) {
            if (!multipleSelectStr) {
              multipleSelectStr += multipleSelectMap[i];
            } else {
              multipleSelectStr += `, ${multipleSelectMap[i]}`;
            }
          }
        }
        obj["multipleSelectValue"] = multipleSelectStr;
      } else {
        obj["multipleSelectValue"] = "";
      }
      obj["key"] = index;
      obj["edit"] = (
        <Button
          id={obj["uuid"]}
          htmlType="button"
          onClick={() => {
            this.onEditBtnClick(obj["uuid"]);
          }}
        >
          Edit
        </Button>
      );
      obj["delete"] = (
        <Button
          id={obj["uuid"]}
          type="danger"
          htmlType="button"
          onClick={() => {
            this.onDeleteBtnClick(obj["uuid"]);
          }}
        >
          Delete
        </Button>
      );
      dataSource.push(obj);
    });
    return dataSource;
  }

  render() {
    console.log("table render");

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
        title: "緊急程度2",
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
        title: "編輯",
        dataIndex: "edit",
        key: "edit",
      },
      {
        title: "刪除",
        dataIndex: "delete",
        key: "delete",
      },
    ];

    return (
      <div>
        <Table dataSource={this.getDataSource()} columns={columns} />;
      </div>
    );
  }
}

const mapDispatchToProps = { deleteTodoListItem };

export default connect(null, mapDispatchToProps)(TodoTable);
