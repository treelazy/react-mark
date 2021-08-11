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

  const [state, setState] = useState({
    uuid: null,
    inputTextValue: "",
    selectValue: null,
    multipleSelectValue: [],
    radioValue: null,
    datePickerString: null,
    timePickerString: null,
    switchValue: false,
    confirmModalText: "",
    confirmModalVisibleFlag: false,
    formModalVisible: false,
    formOKText: "",
    formMode: FORM_MODE.ADD,
  });

  useEffect(() => {
    if (props.showEditFormTrigger) {
      props.setEditFormTrigger(false);
      setState((state) => ({ ...state, formMode: FORM_MODE.EDIT }));
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

      setState((state) => ({ ...state, uuid }));
      setState((state) => ({ ...state, inputTextValue }));
      setState((state) => ({ ...state, selectValue }));
      setState((state) => ({ ...state, multipleSelectValue }));
      setState((state) => ({ ...state, radioValue }));
      setState((state) => ({ ...state, datePickerString }));
      setState((state) => ({ ...state, timePickerString }));
      setState((state) => ({ ...state, switchValue }));
      setState((state) => ({ ...state, formModalVisible: true }));
      setState((state) => ({ ...state, formOKText: "Save" }));
    }
  }, [props.showEditFormTrigger, props]);

  useEffect(() => {
    if (props.showAddFormTrigger) {
      props.setAddFormTrigger(false);
      setState((state) => ({ ...state, formMode: FORM_MODE.ADD }));
      props.setUuidFromTable("");
      resetAllInput();
      setState((state) => ({ ...state, formModalVisible: true }));
      setState((state) => ({ ...state, formOKText: "Add" }));
    }
  }, [props.showAddFormTrigger, props]);

  useEffect(() => {
    if (props.showViewFormTrigger) {
      props.setViewFormTrigger(false);
      setState((state) => ({ ...state, formMode: FORM_MODE.VIEW }));
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

      setState((state) => ({ ...state, uuid }));
      setState((state) => ({ ...state, inputTextValue }));
      setState((state) => ({ ...state, selectValue }));
      setState((state) => ({ ...state, multipleSelectValue }));
      setState((state) => ({ ...state, radioValue }));
      setState((state) => ({ ...state, datePickerString }));
      setState((state) => ({ ...state, timePickerString }));
      setState((state) => ({ ...state, switchValue }));
      setState((state) => ({ ...state, formModalVisible: true }));
      setState((state) => ({ ...state, formOKText: "OK" }));
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
    setState((state) => ({ ...state, [stateName]: value }));
  };

  let onResetBtnClick = () => {
    resetAllInput();
  };

  let onSubmitBtnClick = () => {
    showConfirmModal("確定要新增一筆資料嗎?");
  };

  let submitData = () => {
    let uuid = uuidv4();

    let {
      inputTextValue,
      selectValue,
      multipleSelectValue,
      radioValue,
      datePickerString,
      timePickerString,
      switchValue,
    } = state;

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
    let {
      uuid,
      inputTextValue,
      selectValue,
      multipleSelectValue,
      radioValue,
      datePickerString,
      timePickerString,
      switchValue,
    } = state;

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
    setState((state) => ({ ...state, uuid: "" }));
    setState((state) => ({ ...state, inputTextValue: "" }));
    setState((state) => ({ ...state, selectValue: null }));
    setState((state) => ({ ...state, multipleSelectValue: [] }));
    setState((state) => ({ ...state, radioValue: null }));
    setState((state) => ({ ...state, datePickerString: null }));
    setState((state) => ({ ...state, timePickerString: null }));
    setState((state) => ({ ...state, switchValue: false }));
  };

  let handleConfirmModalCancel = () => {
    setState((state) => ({ ...state, confirmModalVisibleFlag: false }));
  };

  function showConfirmModal(confirmModalText) {
    setState((state) => ({ ...state, confirmModalVisibleFlag: true }));
    setState((state) => ({ ...state, confirmModalText }));
  }

  let hideMyForm = () => {
    setState((state) => ({ ...state, formModalVisible: false }));
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
      title={TITLE_TEXT[state.formMode]}
      visible={state.formModalVisible}
      okText={state.formOKText}
      onOk={() => {
        switch (state.formMode) {
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
            {state.formMode === FORM_MODE.VIEW ? (
              <label>{state.inputTextValue}</label>
            ) : (
              <Input
                value={state.inputTextValue}
                onChange={(e) => {
                  handleChange(e.target.value, "inputTextValue");
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="緊急程度" colon={false}>
            {state.formMode === FORM_MODE.VIEW ? (
              <label>
                {state.selectValue ? priorityMap[state.selectValue] : "-"}
              </label>
            ) : (
              <Select
                disabled={state.formMode === FORM_MODE.VIEW}
                value={state.selectValue}
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
            {state.formMode === FORM_MODE.VIEW ? (
              <label>
                {state.multipleSelectValue.length > 0
                  ? state.multipleSelectValue.map((val) => {
                      return `${multipleSelectMap[val]} `;
                    })
                  : "-"}
              </label>
            ) : (
              <Select
                disabled={state.formMode === FORM_MODE.VIEW}
                mode="multiple"
                placeholder="Please select favourite colors"
                value={state.multipleSelectValue}
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
            {state.formMode === FORM_MODE.VIEW ? (
              <label>
                {state.radioValue ? likeMap[state.radioValue] : "-"}
              </label>
            ) : (
              <Radio.Group
                disabled={state.formMode === FORM_MODE.VIEW}
                onChange={(e) => {
                  handleChange(e.target.value, "radioValue");
                }}
                value={state.radioValue}
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
            {state.formMode === FORM_MODE.VIEW ? (
              <label>
                {state.datePickerString ? state.datePickerString : "-"}
              </label>
            ) : (
              <DatePicker
                disabled={state.formMode === FORM_MODE.VIEW}
                value={
                  state.datePickerString
                    ? moment(state.datePickerString, "YYYY-MM-DD")
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
            {state.formMode === FORM_MODE.VIEW ? (
              <label>
                {state.timePickerString ? state.timePickerString : "-"}
              </label>
            ) : (
              <TimePicker
                disabled={state.formMode === FORM_MODE.VIEW}
                onChange={(time, timeString) => {
                  handleChange(timeString, "timePickerString");
                }}
                value={
                  state.timePickerString
                    ? moment(state.timePickerString, "HH:mm")
                    : null
                }
                format="HH:mm"
              />
            )}
          </Form.Item>

          <Form.Item label="是否完成" colon={false}>
            {state.formMode === FORM_MODE.VIEW ? (
              <label>{state.switchValue ? "已完成" : "未完成"}</label>
            ) : (
              <Switch
                disabled={state.formMode === FORM_MODE.VIEW}
                checked={state.switchValue}
                onChange={(val) => {
                  handleChange(val, "switchValue");
                }}
              />
            )}
          </Form.Item>
          {state.formMode === FORM_MODE.ADD ? (
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
          visible={state.confirmModalVisibleFlag}
          onOk={() => {
            setState((state) => ({ ...state, confirmModalVisibleFlag: false }));
            switch (state.formMode) {
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
          <p>{state.confirmModalText}</p>
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
