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

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(value, stateName){
    this.setState({ [stateName]: value });
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
    
    let todoListString = localStorage.getItem("todoListData");
    let todoList = null;
    if (!todoListString) {
      todoList = {};
    } else {
      todoList = JSON.parse(todoListString)
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
    
    
    console.log(todoList);

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
    
    localStorage.setItem("todoListData", JSON.stringify(todoList));

    
  }

  render() {

    const selectOption = [
      {value:1, selectName:'普通'},
      {value:2, selectName:'重要'},
      {value:3, selectName:'緊急'},
    ];

    const multipleSelectOption = [
      {value:1, selectName:'Red'},
      {value:2, selectName:'Green'},
      {value:3, selectName:'Blue'},
    ];

    const radioOption = [
      {value:1, selectName:'普通'},
      {value:2, selectName:'重要'},
      {value:3, selectName:'緊急'},
    ];

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
    };

    return (
      <div>
        <Form {...layout}>
          <Form.Item label="事件名稱">
            <Input
              value={this.state.inputTextValue}
              onChange={e=>{
                this.handleChange(e.target.value,'inputTextValue');
              }}
            />
          </Form.Item>
          <Form.Item label="緊急程度">
            <Select
              value={this.state.selectValue}
              onChange={val=>{
                this.handleChange(val,'selectValue');
              }}
            >
              {selectOption.map((val)=>{
                return <Select.Option value={val.value}>{val.selectName}</Select.Option>;
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
              onChange={val=>{
                this.handleChange(val,'multipleSelectValue');
              }}
            >
              {multipleSelectOption.map((val)=>{
                return <Select.Option value={val.value}>{val.selectName}</Select.Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item label="緊急程度2">
            <Radio.Group
              onChange={e=>{
                this.handleChange(e.target.value, 'radioValue');
              }}
              value={this.state.radioValue}
            >
              {radioOption.map((val)=>{
                return <Radio value={val.value}>{val.selectName}</Radio>;
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="日期">
            <DatePicker
              value={moment(this.state.datePickerString, "YYYY-MM-DD")}
              format="YYYY-MM-DD"
              locale={locale}
              onChange={(date,dateString)=>{
                this.handleChange(dateString, 'datePickerString');
              }}
            />
          </Form.Item>
          <Form.Item label="時間">
            <TimePicker
              onChange={(time, timeString)=>{
                this.handleChange(timeString, 'timePickerString');
              }}
              value={moment(this.state.timePickerString, "HH:mm")}
              format="HH:mm"
            />
          </Form.Item>

          <Form.Item label="是否完成">
            <Switch
              value={this.state.switchValue}
              onChange={val=>{this.handleChange(val, 'switchValue')}}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
