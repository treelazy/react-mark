import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Switch,
  Typography,
  Row,
  Col,
} from "antd";

import React, { useState } from "react";
import { connect } from "react-redux";
import { radioOption, selectOption } from "../constant";
import {
  searchByCondition,
  clearSearchResultList,
  setAddFormTrigger,
} from "../redux/store";
const { Title } = Typography;

const SearchForm = (props) => {
  const [searchInputTextValue, setSearchInputTextValue] = useState("");
  const [searchSwitchValue, setSearchSwitchValue] = useState(false);
  const [searchSelectValue, setSearchSelectValue] = useState(null);
  const [searchRadioValue, setSearchRadioValue] = useState(null);

  let handleChange = (value, stateName) => {
    switch (stateName) {
      case "searchInputTextValue":
        setSearchInputTextValue(value);
        break;
      case "searchSwitchValue":
        setSearchSwitchValue(value);
        break;
      case "searchSelectValue":
        setSearchSelectValue(value);
        break;
      case "searchRadioValue":
        setSearchRadioValue(value);
        break;
      default:
    }
  };

  let onSearchBtnClick = () => {
    props.searchByCondition({
      searchInputTextValue,
      searchSwitchValue,
      searchSelectValue,
      searchRadioValue,
    });
  };

  let onResetBtnClick = () => {
    setSearchInputTextValue("");
    setSearchSwitchValue(false);
    setSearchSelectValue(null);
    setSearchRadioValue(null);
    props.clearSearchResultList();
  };

  let onAddBtnClick = () => {
    props.setAddFormTrigger(true);
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
            value={searchInputTextValue}
            onChange={(e) => {
              handleChange(e.target.value, "searchInputTextValue");
            }}
          />
        </Form.Item>
        <Form.Item label="是否完成" colon={false}>
          <Switch
            checked={searchSwitchValue}
            onChange={(val) => {
              handleChange(val, "searchSwitchValue");
            }}
          />
        </Form.Item>
        <Form.Item label="緊急程度" colon={false}>
          <Select
            value={searchSelectValue}
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
            value={searchRadioValue}
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
