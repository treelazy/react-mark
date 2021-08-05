import { Button, Table, Typography, Modal } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { likeMap, multipleSelectMap, priorityMap } from "../constant";
import {
  deleteTodoListItem,
  setEditItemUuid,
  showEditForm,
} from "../redux/store";
const { Title } = Typography;

class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      title: "全部資料",
      modalText: "",
      modalVisible: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchResultList !== this.props.searchResultList) {
      if (this.props.searchResultList === null) {
        this.setState({ title: "全部資料" });
      } else {
        if (Object.keys(this.props.searchResultList).length === 0) {
          this.setState({ title: "查無資料" });
        } else {
          this.setState({ title: "搜尋結果" });
        }
      }
    }
  }

  onEditBtnClick = (uuid) => {
    console.log(uuid);
    this.props.showEditForm();
    this.props.setEditItemUuid(uuid);
  };

  onDeleteBtnClick = (uuid) => {
    console.log(uuid);
    this.showModal("確定要刪除該筆資料嗎?", () => {
      this.props.deleteTodoListItem(uuid);
    });
  };

  getDataSource() {
    let tableTodoList = {};
    if (this.props.searchResultList === null) {
      tableTodoList = this.props.todoList;
    } else {
      tableTodoList = this.props.searchResultList;
    }

    let dataSource = [];
    Object.keys(tableTodoList).forEach((key, index) => {
      let obj = { ...tableTodoList[key] };
      obj["selectValue"] = priorityMap[obj["selectValue"]];
      obj["radioValue"] = likeMap[obj["radioValue"]];
      obj["switchValue"] = obj["switchValue"] ? "已完成" : "未完成";
      if (obj["multipleSelectValue"].length !== 0) {
        let multipleSelectStr = "";
        obj["multipleSelectValue"].forEach((val) => {
          if (!multipleSelectStr) {
            multipleSelectStr += multipleSelectMap[val];
          } else {
            multipleSelectStr += `, ${multipleSelectMap[val]}`;
          }
        });

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
      dataSource[index] = obj;
    });
    return dataSource;
  }

  handleModalCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      modalVisible: false,
    });
  };

  showModal = (modalText, modalOKCallback) => {
    this.setState({ modalVisible: true });
    this.setState({ modalText });
    this.handleModalOk = modalOKCallback;
  };

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
        <Title>{this.state.title}</Title>
        <Table dataSource={this.getDataSource()} columns={columns} />
        <Modal
          title="Confirm"
          visible={this.state.modalVisible}
          onOk={() => {
            if (this.handleModalOk) {
              this.setState({ modalVisible: false });
              this.handleModalOk();
            }
          }}
          onCancel={this.handleModalCancel}
        >
          <p>{this.state.modalText}</p>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteTodoListItem,
  setEditItemUuid,
  showEditForm,
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    searchResultList: state.searchResultList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
