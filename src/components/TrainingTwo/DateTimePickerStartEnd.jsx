import React from "react";
import { DatePicker, TimePicker, Form } from "antd";
import { useState } from "react";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useEffect } from "react";
const DateTimePickerStartEnd = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startDateDefault, setStartDateDefault] = useState(null);
  const [endDateDefault, setEndDateDefault] = useState(null);

  let handleChange = (value, stateName) => {
    switch (stateName) {
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      default:
    }
  };

  useEffect(() => {
    if (!endDate) {
      setStartDateDefault(null);
    } else {
      setStartDateDefault(endDate);
    }
  }, [endDate]);

  useEffect(() => {
    if (!startDate) {
      setEndDateDefault(null);
    } else {
      setEndDateDefault(startDate);
    }
  }, [startDate]);

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForStart = (current) => {
    // Can not select days before today and today
    if (!endDate) {
      return;
    }
    return current && current > moment(endDate);
  };

  // 日期禁能的功能與對應的預設日期設置
  let disabledDateForEnd = (current) => {
    if (!startDate) {
      return;
    }
    return current && current < moment(startDate);
  };

  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm";
  const datePlaceholder = "請選擇日期";
  const timePlaceholder = "請選擇時間";
  return (
    <>
      <Form.Item
        label="開始時間"
        colon={false}
        style={{ display: "inline-block" }}
      >
        <DatePicker
          showToday={false}
          placeholder={datePlaceholder}
          value={startDate ? moment(startDate, dateFormat) : null}
          format={dateFormat}
          locale={locale}
          onChange={(date, dateStr) => {
            handleChange(dateStr, "startDate");
          }}
          disabledDate={disabledDateForStart}
          defaultPickerValue={
            startDateDefault === null ? null : moment(startDateDefault)
          }
        />
        <TimePicker
          placeholder={timePlaceholder}
          value={startTime ? moment(startTime, timeFormat) : null}
          format={timeFormat}
          locale={locale}
          onChange={(time, timeStr) => {
            handleChange(timeStr, "startTime");
          }}
        />
      </Form.Item>
      <Form.Item
        label="結束時間"
        colon={false}
        style={{ display: "inline-block" }}
      >
        <DatePicker
          showToday={false}
          placeholder={datePlaceholder}
          value={endDate ? moment(endDate, dateFormat) : null}
          format={dateFormat}
          locale={locale}
          onChange={(date, dateStr) => {
            handleChange(dateStr, "endDate");
          }}
          disabledDate={disabledDateForEnd}
          defaultPickerValue={
            endDateDefault === null ? null : moment(endDateDefault)
          }
        />
        <TimePicker
          placeholder={timePlaceholder}
          value={endTime ? moment(endTime, timeFormat) : null}
          format={timeFormat}
          locale={locale}
          onChange={(time, timeStr) => {
            handleChange(timeStr, "endTime");
          }}
        />
      </Form.Item>
    </>
  );
};

export default DateTimePickerStartEnd;
