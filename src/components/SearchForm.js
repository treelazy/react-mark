import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Switch,
  DatePicker,
  Typography,
  Row,
  Col,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  radioOption,
  SEARCH_DATE_PICKER_TYPE,
  selectOption,
} from "../constant";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  searchByCondition,
  clearSearchResultList,
  setAddFormTrigger,
} from "../redux/store";
const { Title } = Typography;

const SearchForm = (props) => {
  const [state, setState] = useState({
    searchInputTextValue: "",
    searchSwitchValue: false,
    searchSelectValue: null,
    searchRadioValue: null,
    searchStartDateString: null,
    searchEndDateString: null,
    searchStartDateDefault: null,
    searchEndDateDefault: null,
  });

  let handleChange = (value, stateName) => {
    switch (stateName) {
      case "searchInputTextValue":
        setState((state) => ({ ...state, searchInputTextValue: value }));
        break;
      case "searchSwitchValue":
        setState((state) => ({ ...state, searchSwitchValue: value }));
        break;
      case "searchSelectValue":
        setState((state) => ({ ...state, searchSelectValue: value }));
        break;
      case "searchRadioValue":
        setState((state) => ({ ...state, searchRadioValue: value }));
        break;
      default:
    }
  };

  let handleDatePickerChange = (pickerType, date, dateString) => {
    switch (pickerType) {
      case SEARCH_DATE_PICKER_TYPE.START:
        setState((state) => ({ ...state, searchStartDateString: dateString }));
        break;
      case SEARCH_DATE_PICKER_TYPE.END:
        setState((state) => ({ ...state, searchStartDateString: dateString }));
        break;
      default:
        break;
    }
  };

  let onSearchBtnClick = () => {
    const {
      searchInputTextValue,
      searchSwitchValue,
      searchSelectValue,
      searchRadioValue,
      searchStartDateString,
      searchEndDateString,
    } = state;

    props.searchByCondition({
      searchInputTextValue,
      searchSwitchValue,
      searchSelectValue,
      searchRadioValue,
      searchStartDateString,
      searchEndDateString,
    });
  };

  let onResetBtnClick = () => {
    setState((state) => ({ ...state, searchInputTextValue: "" }));
    setState((state) => ({ ...state, searchSwitchValue: false }));
    setState((state) => ({ ...state, searchSelectValue: null }));
    setState((state) => ({ ...state, searchRadioValue: null }));
    props.clearSearchResultList();
  };

  let onAddBtnClick = () => {
    props.setAddFormTrigger(true);
  };

  useEffect(() => {
    if (!state.searchEndDateString) {
      setState((state) => ({ ...state, searchStartDateDefault: null }));
    } else {
      setState((state) => ({
        ...state,
        searchStartDateDefault: state.searchEndDateString,
      }));
    }
  }, [state.searchEndDateString]);

  useEffect(() => {
    if (!state.searchStartDateString) {
      setState((state) => ({ ...state, searchEndDateDefault: null }));
    } else {
      setState((state) => ({
        ...state,
        searchEndDateDefault: state.searchStartDateString,
      }));
    }
  }, [state.searchStartDateString]);

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForStart = (current) => {
    // Can not select days before today and today
    if (!state.searchEndDateString) {
      return;
    }
    return current && current > moment(state.searchEndDateString);
  };

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForEnd = (current) => {
    if (!state.searchStartDateString) {
      return;
    }
    return current && current < moment(state.searchStartDateString);
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
    <div>
      <Title>條件搜尋</Title>
      <Form {...layout}>
        <Form.Item label="關鍵字" colon={false}>
          <Input
            value={state.searchInputTextValue}
            onChange={(e) => {
              handleChange(e.target.value, "searchInputTextValue");
            }}
          />
        </Form.Item>
        <Form.Item label="時間範圍" colon={false}>
          <DatePicker
            defaultPickerValue={
              state.searchStartDateDefault === null
                ? null
                : moment(state.searchStartDateDefault)
            }
            placeholder="開始日期"
            format="YYYY-MM-DD"
            locale={locale}
            disabledDate={disabledDateForStart}
            value={
              state.searchStartDateString
                ? moment(state.searchStartDateString, "YYYY-MM-DD")
                : null
            }
            onChange={(date, dateString) => {
              handleDatePickerChange(
                SEARCH_DATE_PICKER_TYPE.START,
                date,
                dateString
              );
            }}
          />
          &nbsp;&nbsp;&nbsp;
          <DatePicker
            defaultPickerValue={
              state.searchEndDateDefault === null
                ? null
                : moment(state.searchEndDateDefault)
            }
            placeholder="結束日期"
            format="YYYY-MM-DD"
            locale={locale}
            disabledDate={disabledDateForEnd}
            value={
              state.searchEndDateString
                ? moment(state.searchEndDateString, "YYYY-MM-DD")
                : null
            }
            onChange={(date, dateString) => {
              handleDatePickerChange(
                SEARCH_DATE_PICKER_TYPE.END,
                date,
                dateString
              );
            }}
          />
        </Form.Item>
        <Form.Item label="是否完成" colon={false}>
          <Switch
            checked={state.searchSwitchValue}
            onChange={(val) => {
              handleChange(val, "searchSwitchValue");
            }}
          />
        </Form.Item>
        <Form.Item label="緊急程度" colon={false}>
          <Select
            value={state.searchSelectValue}
            onChange={(val) => {
              handleChange(val, "searchSelectValue");
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
        <Form.Item label="喜好" colon={false}>
          <Radio.Group
            onChange={(e) => {
              handleChange(e.target.value, "searchRadioValue");
            }}
            value={state.searchRadioValue}
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
        <div>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Row justify="space-around" style={{ width: "400px" }}>
              <Col span={8}>
                <Button
                  style={{ width: "100px" }}
                  type="primary"
                  htmlType="button"
                  onClick={onSearchBtnClick}
                  icon="search"
                >
                  Search
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  style={{ width: "100px" }}
                  htmlType="button"
                  onClick={onResetBtnClick}
                >
                  Reset
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  style={{ width: "100px" }}
                  htmlType="button"
                  type="primary"
                  onClick={onAddBtnClick}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  searchByCondition,
  clearSearchResultList,
  setAddFormTrigger,
};

/*
  const mapStateToProps = (state) => {
    return {
      todoList: state.todoList,
      searchResultList: state.searchResultList,
    };
  };
*/
export default connect(null, mapDispatchToProps)(SearchForm);
