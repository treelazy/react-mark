import React from "react";
import { DatePicker, TimePicker, Form, Col } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useFormikContext } from "formik";
const DateTimePickerStartEnd = (props) => {

  const [startDateDefault, setStartDateDefault] = useState(null);
  const [endDateDefault, setEndDateDefault] = useState(null);

  const { values, setFieldValue } = useFormikContext();

  let handleChange = (value, stateName) => {
    switch (stateName) {
      case "startDate":
        setFieldValue("startDate", value);
        break;
      case "endDate":
        setFieldValue("endDate", value);
        break;
      case "startTime":
        setFieldValue("startTime", value);
        break;
      case "endTime":
        setFieldValue("endTime", value);
        break;
      default:
    }
  };

  useEffect(() => {
    setFieldValue("startEndDateTime", [
      values.startDate,
      values.startTime,
      values.endDate,
      values.endTime,
    ]);
  }, [
    values.startDate,
    values.startTime,
    values.endDate,
    values.endTime,
    setFieldValue,
  ]);

  let onPickerBlur = () => {
    if (props.onBlur) {
      props.onBlur();
    }
  };

  useEffect(() => {
    if (!values.endDate) {
      setStartDateDefault(null);
    } else {
      setStartDateDefault(values.endDate);
    }
  }, [values.endDate]);

  useEffect(() => {
    if (!values.startDate) {
      setEndDateDefault(null);
    } else {
      setEndDateDefault(values.startDate);
    }
  }, [values.startDate]);

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForStart = (current) => {
    // Can not select days before today and today
    if (!values.endDate) {
      return;
    }
    return current && current > moment(values.endDate);
  };

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForEnd = (current) => {
    if (!values.startDate) {
      return;
    }
    return current && current < moment(values.startDate);
  };

  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm";
  const datePlaceholder = "請選擇日期";
  const timePlaceholder = "請選擇時間";
  return (
    <>
      <Col span={8}>
        <Form.Item label="開始時間" colon={false} required={true}>
          <DatePicker
            showToday={false}
            placeholder={datePlaceholder}
            value={
              values.startDate ? moment(values.startDate, dateFormat) : null
            }
            format={dateFormat}
            locale={locale}
            onChange={(date, dateStr) => {
              handleChange(dateStr, "startDate");
            }}
            onBlur={(e) => {
              onPickerBlur(e);
            }}
            disabledDate={disabledDateForStart}
            defaultPickerValue={
              startDateDefault === null ? null : moment(startDateDefault)
            }
          />
          <TimePicker
            placeholder={timePlaceholder}
            value={
              values.startTime ? moment(values.startTime, timeFormat) : null
            }
            format={timeFormat}
            locale={locale}
            onChange={(time, timeStr) => {
              handleChange(timeStr, "startTime");
            }}
            onBlur={(e) => {
              onPickerBlur(e);
            }}
          />
          <br />
          <label style={{ color: "red", fontSize: "0.5rem" }}>
            {props.errorMessage ? props.errorMessage.split(",")[0] : null}
          </label>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="結束時間" colon={false} required={true}>
          <DatePicker
            showToday={false}
            placeholder={datePlaceholder}
            value={values.endDate ? moment(values.endDate, dateFormat) : null}
            format={dateFormat}
            locale={locale}
            onChange={(date, dateStr) => {
              handleChange(dateStr, "endDate");
            }}
            onBlur={(e) => {
              onPickerBlur(e);
            }}
            disabledDate={disabledDateForEnd}
            defaultPickerValue={
              endDateDefault === null ? null : moment(endDateDefault)
            }
          />
          <TimePicker
            placeholder={timePlaceholder}
            value={values.endTime ? moment(values.endTime, timeFormat) : null}
            format={timeFormat}
            locale={locale}
            onChange={(time, timeStr) => {
              handleChange(timeStr, "endTime");
            }}
            onBlur={(e) => {
              onPickerBlur(e);
            }}
          />
          <br />
          <label style={{ color: "red", fontSize: "0.5rem" }}>
            {props.errorMessage ? props.errorMessage.split(",")[1] : null}
          </label>
        </Form.Item>
      </Col>
    </>
  );
};

export default DateTimePickerStartEnd;
