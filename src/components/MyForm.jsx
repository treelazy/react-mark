import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Switch,
  TimePicker,
  Modal,
} from "antd";
import React, { Component } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

import {
  updateTodoList,
  setMyFormIsEditMode,
  setEditItemUuid,
  resetEditFormTrigger,
  resetAddFormTrigger,
} from "../redux/store";
import { connect } from "react-redux";
import { multipleSelectOption, radioOption, selectOption } from "../constant";
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      uuid: null,
      inputTextValue: "",
      selectValue: null,
      multipleSelectValue: [],
      radioValue: null,
      datePickerString: null,
      timePickerString: null,
      switchValue: false,
      confirmModalText: "",
      confirmModalVisible: false,
      formModalVisible: false,
      formOKText: "",
    };
    this.handleConfirmModalOk = null;
    this.onFormModelOKCB = null;
  }

  componentDidUpdate(prevProps) {
    //Edit
    if (!prevProps.showEditFormTrigger && this.props.showEditFormTrigger) {
      this.props.resetEditFormTrigger();
      this.props.setMyFormIsEditMode(true);
      // 將所有資料都直接投射到state
      this.setState(this.props.todoList[this.props.editItemUuid]);
      this.setState({ formModalVisible: true });
      this.setState({ formOKText: "Save" });
      this.onFormModelOKCB = this.onSaveBtnClick;
    }

    //Add
    if (!prevProps.showAddFormTrigger && this.props.showAddFormTrigger) {
      this.props.resetAddFormTrigger();
      this.props.setMyFormIsEditMode(false);
      this.resetAllInput();
      this.setState({ formModalVisible: true });
      this.setState({ formOKText: "Add" });
      this.onFormModelOKCB = this.onSubmitBtnClick;
    }
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  handleChange = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  onResetBtnClick = () => {
    this.resetAllInput();
  };

  onSubmitBtnClick = () => {
    this.showConfirmModal("確定要新增一筆資料嗎?", () => {
      let uuid = this.uuidv4();

      let {
        inputTextValue,
        selectValue,
        multipleSelectValue,
        radioValue,
        datePickerString,
        timePickerString,
        switchValue,
      } = this.state;

      let todoListItem = {
        uuid,
        inputTextValue,
        selectValue,
        multipleSelectValue,
        radioValue,
        datePickerString,
        timePickerString,
        switchValue,
      };

      this.props.updateTodoList(todoListItem);
      this.hideMyForm();
    });
  };

  onSaveBtnClick = () => {
    console.log("onSaveBtnClick");
    this.showConfirmModal("確定要修改資料嗎?", () => {
      this.props.updateTodoList(this.state);
      this.props.setMyFormIsEditMode(false);
      this.resetAllInput();
      this.hideMyForm();
    });
  };

  resetAllInput = () => {
    this.setState({
      uuid: "",
      inputTextValue: "",
      selectValue: null,
      multipleSelectValue: [],
      radioValue: null,
      datePickerString: null,
      timePickerString: null,
      switchValue: false,
    });
  };

  handleConfirmModalCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      confirmModalVisible: false,
    });
  };

  showConfirmModal = (confirmModalText, modalOKCallback) => {
    this.setState({ confirmModalVisible: true });
    this.setState({ confirmModalText });
    this.handleConfirmModalOk = modalOKCallback;
  };

  hideMyForm() {
    this.setState({ formModalVisible: false });
  }

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
    };

    return (
      <Modal
        title={this.props.isEditMode ? "編輯事項" : "新增事項"}
        visible={this.state.formModalVisible}
        okText={this.state.formOKText}
        onOk={() => {
          if (this.onFormModelOKCB) {
            this.onFormModelOKCB();
          }
        }}
        onCancel={() => {
          this.hideMyForm();
        }}
      >
        <div>
          <Form {...layout}>
            <Form.Item label="事件名稱">
              <Input
                value={this.state.inputTextValue}
                onChange={(e) => {
                  this.handleChange(e.target.value, "inputTextValue");
                }}
              />
            </Form.Item>
            <Form.Item label="緊急程度">
              <Select
                value={this.state.selectValue}
                onChange={(val) => {
                  this.handleChange(val, "selectValue");
                }}
              >
                {selectOption.map((val) => {
                  return (
                    <Select.Option value={val.value} key={val.value}>
                      {val.selectName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="select-multiple"
              label="多重選擇"
              rules={[
                {
                  required: true,
                  message: "Please select your favourite colors!",
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Please select favourite colors"
                value={this.state.multipleSelectValue}
                onChange={(val) => {
                  this.handleChange(val, "multipleSelectValue");
                }}
              >
                {multipleSelectOption.map((val) => {
                  return (
                    <Select.Option value={val.value} key={val.value}>
                      {val.selectName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="喜好">
              <Radio.Group
                onChange={(e) => {
                  this.handleChange(e.target.value, "radioValue");
                }}
                value={this.state.radioValue}
              >
                {radioOption.map((val) => {
                  return (
                    <Radio value={val.value} key={val.value}>
                      {val.selectName}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="日期">
              <DatePicker
                value={
                  this.state.datePickerString
                    ? moment(this.state.datePickerString, "YYYY-MM-DD")
                    : null
                }
                format="YYYY-MM-DD"
                locale={locale}
                onChange={(date, dateString) => {
                  this.handleChange(dateString, "datePickerString");
                }}
              />
            </Form.Item>
            <Form.Item label="時間">
              <TimePicker
                onChange={(time, timeString) => {
                  this.handleChange(timeString, "timePickerString");
                }}
                value={
                  this.state.timePickerString
                    ? moment(this.state.timePickerString, "HH:mm")
                    : null
                }
                format="HH:mm"
              />
            </Form.Item>

            <Form.Item label="是否完成">
              <Switch
                checked={this.state.switchValue}
                onChange={(val) => {
                  this.handleChange(val, "switchValue");
                }}
              />
            </Form.Item>
            {this.props.isEditMode ? null : (
              <div>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button htmlType="button" onClick={this.onResetBtnClick}>
                    Reset
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form>

          <Modal
            title="Confirm"
            visible={this.state.confirmModalVisible}
            onOk={() => {
              if (this.handleConfirmModalOk) {
                this.setState({ confirmModalVisible: false });
                this.handleConfirmModalOk();
              }
            }}
            onCancel={this.handleConfirmModalCancel}
          >
            <p>{this.state.confirmModalText}</p>
          </Modal>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  updateTodoList,
  setMyFormIsEditMode,
  setEditItemUuid,
  resetEditFormTrigger,
  resetAddFormTrigger,
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    isEditMode: state.isMyFormEditMode,
    editItemUuid: state.editItemUuid,
    showAddFormTrigger: state.showAddFormTrigger,
    showEditFormTrigger: state.showEditFormTrigger,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyForm);
