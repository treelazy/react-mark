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
  setUuidFromTable,
  setEditFormTrigger,
  setAddFormTrigger,
  setViewFormTrigger,
} from "../redux/store";
import { connect } from "react-redux";
import {
  FORM_MODE,
  likeMap,
  multipleSelectMap,
  multipleSelectOption,
  priorityMap,
  radioOption,
  selectOption,
} from "../constant";

const MyForm = (props) => {
  const TITLE_TEXT = Object.freeze({
    1: "編輯事項",
    2: "新增事項",
    3: "檢視事項",
  });

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
  const [formMode, setFormMode] = useState(FORM_MODE.ADD);

  useEffect(() => {
    if (props.showEditFormTrigger) {
      props.setEditFormTrigger(false);
      setFormMode(FORM_MODE.EDIT);
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
      } = props.todoList[props.uuidFromTable];
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
      props.setAddFormTrigger(false);
      setFormMode(FORM_MODE.ADD);
      props.setUuidFromTable("");
      resetAllInput();
      setFormModalVisible(true);
      setFormOKText("Add");
    }
  }, [props.showAddFormTrigger, props]);

  useEffect(() => {
    if (props.showViewFormTrigger) {
      props.setViewFormTrigger(false);
      setFormMode(FORM_MODE.VIEW);
      let {
        uuid,
        inputTextValue,
        selectValue,
        multipleSelectValue,
        radioValue,
        datePickerString,
        timePickerString,
        switchValue,
      } = props.todoList[props.uuidFromTable];
      setUuid(uuid);
      setInputTextValue(inputTextValue);
      setSelectValue(selectValue);
      setMultipleSelectValue(multipleSelectValue);
      setRadioValue(radioValue);
      setDatePickerString(datePickerString);
      setTimePickerString(timePickerString);
      setSwitchValue(switchValue);
      setFormModalVisible(true);
      setFormOKText("OK");
    }
  }, [props.showViewFormTrigger, props]);

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
      title={TITLE_TEXT[formMode]}
      visible={formModalVisible}
      okText={formOKText}
      onOk={() => {
        switch (formMode) {
          case FORM_MODE.EDIT:
            onSaveBtnClick();
            break;
          case FORM_MODE.ADD:
            onSubmitBtnClick();
            break;
          case FORM_MODE.VIEW:
            hideMyForm();
            break;
          default:
        }
      }}
      onCancel={() => {
        hideMyForm();
      }}
    >
      <div>
        <Form {...layout}>
          <Form.Item label="事件名稱" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{inputTextValue}</label>
            ) : (
              <Input
                value={inputTextValue}
                onChange={(e) => {
                  handleChange(e.target.value, "inputTextValue");
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="緊急程度" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{selectValue ? priorityMap[selectValue] : "-"}</label>
            ) : (
              <Select
                disabled={formMode === FORM_MODE.VIEW}
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
            )}
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
            {formMode === FORM_MODE.VIEW ? (
              <label>
                {multipleSelectValue.length > 0
                  ? multipleSelectValue.map((val) => {
                      return `${multipleSelectMap[val]} `;
                    })
                  : "-"}
              </label>
            ) : (
              <Select
                disabled={formMode === FORM_MODE.VIEW}
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
            )}
          </Form.Item>
          <Form.Item label="喜好" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{radioValue ? likeMap[radioValue] : "-"}</label>
            ) : (
              <Radio.Group
                disabled={formMode === FORM_MODE.VIEW}
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
            )}
          </Form.Item>
          <Form.Item label="日期" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{datePickerString ? datePickerString : "-"}</label>
            ) : (
              <DatePicker
                disabled={formMode === FORM_MODE.VIEW}
                value={
                  datePickerString
                    ? moment(datePickerString, "YYYY-MM-DD")
                    : null
                }
                format="YYYY-MM-DD"
                locale={locale}
                onChange={(date, dateString) => {
                  handleChange(dateString, "datePickerString");
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="時間" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{timePickerString ? timePickerString : "-"}</label>
            ) : (
              <TimePicker
                disabled={formMode === FORM_MODE.VIEW}
                onChange={(time, timeString) => {
                  handleChange(timeString, "timePickerString");
                }}
                value={
                  timePickerString ? moment(timePickerString, "HH:mm") : null
                }
                format="HH:mm"
              />
            )}
          </Form.Item>

          <Form.Item label="是否完成" colon={false}>
            {formMode === FORM_MODE.VIEW ? (
              <label>{switchValue ? "已完成" : "未完成"}</label>
            ) : (
              <Switch
                disabled={formMode === FORM_MODE.VIEW}
                checked={switchValue}
                onChange={(val) => {
                  console.log(props.showEditFormTrigger);
                  handleChange(val, "switchValue");
                }}
              />
            )}
          </Form.Item>
          {formMode === FORM_MODE.ADD ? (
            <div>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button htmlType="button" onClick={onResetBtnClick}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          ) : null}
        </Form>

        <Modal
          title="Confirm"
          visible={confirmModalVisibleFlag}
          onOk={() => {
            setConfirmModalVisibleFlag(false);
            switch (formMode) {
              case FORM_MODE.EDIT:
                saveData();
                break;
              case FORM_MODE.ADD:
                submitData();
                break;
              default:
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
  setEditFormTrigger,
  setAddFormTrigger,
  setViewFormTrigger,
  setUuidFromTable,
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    uuidFromTable: state.uuidFromTable,
    showAddFormTrigger: state.showAddFormTrigger,
    showEditFormTrigger: state.showEditFormTrigger,
    showViewFormTrigger: state.showViewFormTrigger,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyForm);
