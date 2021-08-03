import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Switch,
  TimePicker,
} from "antd";
import React, { Component } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
import "antd/dist/antd.css";
export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      uuid: null,
      inputTextValue: "",
      selectValue: 1,
      multipleSelectValue: [],
      radioValue: 1,
      datePickerString: "2021-01-01",
      timePickerString: "00:00",
      switchValue: false,
    };

    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.onMultipleSelectChange = this.onMultipleSelectChange.bind(this);
    this.onTimePickerChange = this.onTimePickerChange.bind(this);
    this.onResetBtnClick = this.onResetBtnClick.bind(this);
    this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
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

  onInputTextChange(e) {
    this.setState({ inputTextValue: e.target.value });
  }

  onSelectChange(value) {
    this.setState({ selectValue: value });
  }

  onMultipleSelectChange(value) {
    console.log(value);
    this.setState({ multipleSelectValue: value });
  }

  onRadioChange(e) {
    this.setState({ radioValue: e.target.value });
  }

  onDatePickerChange(date, dateString) {
    console.log(dateString);
    this.setState({
      datePickerString: dateString,
    });
  }

  onTimePickerChange(time, timeString) {
    console.log(timeString);
    this.setState({
      timePickerString: timeString,
    });
  }

  onSwitchChange(val) {
    console.log(val);
    this.setState({ switchValue: val });
  }

  onResetBtnClick() {
    this.setState({
      uuid: "",
      inputTextValue: "",
      selectValue: 1,
      multipleSelectValue: [],
      radioValue: 1,
      datePickerString: "2021-01-01",
      timePickerString: "00:00",
      switchValue: false,
    });
  }

  onSubmitBtnClick() {
    /*
    var todoList = localStorage.getItem("todoListData");
    if (!todoList) {
      todoList = {};
    }
    let uuid = this.state.uuid;
    if (!uuid) {
      uuid = this.uuidv4();
    }

    let {
      inputTextValue,
      selectValue,
      multipleSelectValue,
      radioValue,
      datePickerString,
      timePickerString,
      switchValue,
    } = this.state;

    todoList[uuid] = {
      uuid,
      inputTextValue,
      selectValue,
      multipleSelectValue,
      radioValue,
      datePickerString,
      timePickerString,
      switchValue,
    };
    localStorage.setItem("todoListData", todoList);
    console.log(todoList);
    */
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Item label="事件名稱">
            <Input
              value={this.state.inputTextValue}
              onChange={this.onInputTextChange}
            />
          </Form.Item>
          <Form.Item label="緊急程度">
            <Select
              value={this.state.selectValue}
              onChange={this.onSelectChange}
            >
              <Select.Option value={1}>普通</Select.Option>
              <Select.Option value={2}>重要</Select.Option>
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
              onChange={this.onMultipleSelectChange}
            >
              <Select.Option value="1">Red</Select.Option>
              <Select.Option value="2">Green</Select.Option>
              <Select.Option value="3">Blue</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="緊急程度2">
            <Radio.Group
              onChange={this.onRadioChange}
              value={this.state.radioValue}
            >
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="日期">
            <DatePicker
              value={moment(this.state.datePickerString, "YYYY-MM-DD")}
              format="YYYY-MM-DD"
              locale={locale}
              onChange={this.onDatePickerChange}
            />
          </Form.Item>
          <Form.Item label="時間">
            <TimePicker
              onChange={this.onTimePickerChange}
              value={moment(this.state.timePickerString, "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>

          <Form.Item label="已完成">
            <Switch
              value={this.state.switchValue}
              onChange={this.onSwitchChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              onClick={this.onSubmitBtnClick}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onResetBtnClick}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
