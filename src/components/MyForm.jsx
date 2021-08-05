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
import React, { useState, useEffect } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

import {
  updateTodoList,
  setEditItemUuid,
  resetEditFormTrigger,
  resetAddFormTrigger,
} from "../redux/store";
import { connect } from "react-redux";
import { multipleSelectOption, radioOption, selectOption } from "../constant";

const MyForm = (props) => {
  const [uuid, setUuid] = useState(null);
  const [inputTextValue, setInputTextValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [multipleSelectValue, setMultipleSelectValue] = useState([]);
  const [radioValue, setRadioValue] = useState(null);
  const [datePickerString, setDatePickerString] = useState(null);
  const [timePickerString, setTimePickerString] = useState(null);
  const [switchValue, setSwitchValue] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState("");
  const [confirmModalVisibleFlag, setConfirmModalVisibleFlag] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [formOKText, setFormOKText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (props.showEditFormTrigger) {
      props.resetEditFormTrigger();
      setIsEditMode(true);
      // 將所有資料都直接投射到state
      let {
        uuid,
        inputTextValue,
        selectValue,
        multipleSelectValue,
        radioValue,
        datePickerString,
        timePickerString,
        switchValue,
      } = props.todoList[props.editItemUuid];
      setUuid(uuid);
      setInputTextValue(inputTextValue);
      setSelectValue(selectValue);
      setMultipleSelectValue(multipleSelectValue);
      setRadioValue(radioValue);
      setDatePickerString(datePickerString);
      setTimePickerString(timePickerString);
      setSwitchValue(switchValue);
      setFormModalVisible(true);
      setFormOKText("Save");
    }
  }, [props.showEditFormTrigger, props]);

  useEffect(() => {
    if (props.showAddFormTrigger) {
      props.resetAddFormTrigger();
      setIsEditMode(false);
      props.setEditItemUuid("");
      resetAllInput();
      setFormModalVisible(true);
      setFormOKText("Add");
    }
  }, [props.showAddFormTrigger, props]);

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  let handleChange = (value, stateName) => {
    switch (stateName) {
      case "inputTextValue":
        setInputTextValue(value);
        break;
      case "selectValue":
        setSelectValue(value);
        break;
      case "multipleSelectValue":
        setMultipleSelectValue(value);
        break;
      case "radioValue":
        setRadioValue(value);
        break;
      case "datePickerString":
        setDatePickerString(value);
        break;
      case "timePickerString":
        setTimePickerString(value);
        break;
      case "switchValue":
        setSwitchValue(value);
        break;
      default:
    }
  };

  let onResetBtnClick = () => {
    resetAllInput();
  };

  let onSubmitBtnClick = () => {
    showConfirmModal("確定要新增一筆資料嗎?");
  };

  let submitData = () => {
    let uuid = uuidv4();
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

    props.updateTodoList(todoListItem);
    hideMyForm();
  };

  let onSaveBtnClick = () => {
    showConfirmModal("確定要修改資料嗎?");
  };

  let saveData = () => {
    props.updateTodoList({
      uuid,
      inputTextValue,
      selectValue,
      multipleSelectValue,
      radioValue,
      datePickerString,
      timePickerString,
      switchValue,
    });
    resetAllInput();
    hideMyForm();
  };

  let resetAllInput = () => {
    setUuid("");
    setInputTextValue("");
    setSelectValue(null);
    setMultipleSelectValue([]);
    setRadioValue(null);
    setDatePickerString(null);
    setTimePickerString(null);
    setSwitchValue(false);
  };

  let handleConfirmModalCancel = () => {
    setConfirmModalVisibleFlag(false);
  };

  function showConfirmModal(confirmModalText) {
    setConfirmModalVisibleFlag(true);
    setConfirmModalText(confirmModalText);
  }

  let hideMyForm = () => {
    setFormModalVisible(false);
  };

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
      title={isEditMode ? "編輯事項" : "新增事項"}
      visible={formModalVisible}
      okText={formOKText}
      onOk={() => {
        if (isEditMode) {
          onSaveBtnClick();
        } else {
          onSubmitBtnClick();
        }
      }}
      onCancel={() => {
        hideMyForm();
      }}
    >
      <div>
        <Form {...layout}>
          <Form.Item label="事件名稱" colon={false}>
            <Input
              value={inputTextValue}
              onChange={(e) => {
                handleChange(e.target.value, "inputTextValue");
              }}
            />
          </Form.Item>
          <Form.Item label="緊急程度" colon={false}>
            <Select
              value={selectValue}
              onChange={(val) => {
                handleChange(val, "selectValue");
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
            colon={false}
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
              value={multipleSelectValue}
              onChange={(val) => {
                handleChange(val, "multipleSelectValue");
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
          <Form.Item label="喜好" colon={false}>
            <Radio.Group
              onChange={(e) => {
                handleChange(e.target.value, "radioValue");
              }}
              value={radioValue}
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
          <Form.Item label="日期" colon={false}>
            <DatePicker
              value={
                datePickerString ? moment(datePickerString, "YYYY-MM-DD") : null
              }
              format="YYYY-MM-DD"
              locale={locale}
              onChange={(date, dateString) => {
                handleChange(dateString, "datePickerString");
              }}
            />
          </Form.Item>
          <Form.Item label="時間" colon={false}>
            <TimePicker
              onChange={(time, timeString) => {
                handleChange(timeString, "timePickerString");
              }}
              value={
                timePickerString ? moment(timePickerString, "HH:mm") : null
              }
              format="HH:mm"
            />
          </Form.Item>

          <Form.Item label="是否完成" colon={false}>
            <Switch
              checked={switchValue}
              onChange={(val) => {
                handleChange(val, "switchValue");
              }}
            />
          </Form.Item>
          {isEditMode ? null : (
            <div>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button htmlType="button" onClick={onResetBtnClick}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          )}
        </Form>

        <Modal
          title="Confirm"
          visible={confirmModalVisibleFlag}
          onOk={() => {
            setConfirmModalVisibleFlag(false);
            if (isEditMode) {
              saveData();
            } else {
              submitData();
            }
          }}
          onCancel={handleConfirmModalCancel}
        >
          <p>{confirmModalText}</p>
        </Modal>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = {
  updateTodoList,
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
