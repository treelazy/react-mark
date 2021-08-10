import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Switch,
  Select,
  Radio,
  Button,
  Modal,
  Typography,
  message,
} from "antd";

import { getDescriptionLength } from "./validationSchema";
import { FORM_COLOR_OPTION, FORM_MODE, GENDER_OPTION } from "./Constant";
import DateTimePickerStartEnd from "./DateTimePickerStartEnd";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./TrainingTwo";
import { useFormikContext } from "formik";

const { Title } = Typography;
const ValidationFormInFormik = (props) => {
  const {
    updateValidationFormList,
    setFormVisible,
    formMode,
    formVisible,
    formTargerSerialNumber,
    validationFormList,
    showConfirmModal,
  } = useContext(MyContext);
  const {
    isValid,
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    setFieldTouched,
    handleReset,
    validateForm,
    setTouched,
  } = useFormikContext();
  const [title, setTitle] = useState("新增資料");
  useEffect(() => {
    setFieldValue("isEditMode", false, false);
    switch (formMode) {
      case FORM_MODE.ADD:
        handleReset();
        setTitle("新增資料");
        break;
      case FORM_MODE.EDIT:
        setFieldValue("isEditMode", true, false);
        setTitle("編輯資料");
        let id = formTargerSerialNumber;
        setFieldValue("serialNumber", validationFormList[id].serialNumber);
        setFieldValue(
          "organizationName",
          validationFormList[id].organizationName
        );
        setFieldValue("weight", validationFormList[id].weight);
        setFieldValue("price", validationFormList[id].price);
        setFieldValue("description", validationFormList[id].description);
        setFieldValue("instruction", validationFormList[id].instruction);
        setFieldValue("hasUpperLimit", validationFormList[id].hasUpperLimit);
        setFieldValue("upperLimit", validationFormList[id].upperLimit);
        setFieldValue("color", validationFormList[id].color);
        setFieldValue("startDate", validationFormList[id].startDate);
        setFieldValue("startTime", validationFormList[id].startTime);
        setFieldValue("endDate", validationFormList[id].endDate);
        setFieldValue("endTime", validationFormList[id].endTime);
        setFieldValue(
          "startEndDateTime",
          validationFormList[id].startEndDateTime
        );
        setFieldValue("gender", validationFormList[id].gender);
        break;
      default:
        break;
    }
  }, [
    formMode,
    formTargerSerialNumber,
    validationFormList,
    setFieldValue,
    handleReset,
  ]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <Modal
        visible={formVisible}
        width="80vw"
        onCancel={() => {
          setFormVisible(false);
        }}
        onOk={() => {
          if (!isValid) {
            //驗證欄位是否有誤, 設定所有touched, 讓它顯示警告
            validateForm().then((errors) =>
              setTouched({ ...touched, ...errors })
            );
            message.error("表單目前存在錯誤!");
            return;
          }
          switch (formMode) {
            case FORM_MODE.ADD:
              showConfirmModal(
                "Confirm",
                "確定要新增一筆嗎?",
                "OK",
                "Cancel",
                () => {
                  updateValidationFormList(values);
                  message.success("新增成功!");
                  setFormVisible(false);
                }
              );
              break;
            case FORM_MODE.EDIT:
              showConfirmModal(
                "Confirm",
                "確定要保存修改嗎?",
                "OK",
                "Cancel",
                () => {
                  updateValidationFormList(values);
                  message.success("修改成功!");
                  setFormVisible(false);
                }
              );
              break;
            default:
              break;
          }
        }}
      >
        <Title>{title}</Title>
        <Form {...layout}>
          <Row justify="space-around" style={{ width: "80vw" }}>
            <Col span={6}>
              <Form.Item label="編號" required={true} colon={false}>
                <div style={{ display: "inline-block" }}>
                  <Input
                    style={{ width: "12rem", display: "block" }}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.serialNumber}
                    name="serialNumber"
                    placeholder="請輸入"
                    suffix={`${values.serialNumber.length}/10`}
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.serialNumber ? errors.serialNumber : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="組織名稱" colon={false}>
                <div style={{ display: "inline-block" }}>
                  <Input
                    style={{ width: "15rem", display: "block" }}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organizationName}
                    name="organizationName"
                    placeholder="請輸入"
                    suffix={`${values.organizationName.length}/15`}
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.organizationName ? errors.organizationName : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="重量" colon={false}>
                <div style={{ display: "inline-block" }}>
                  <Input
                    style={{ width: "10rem", display: "block" }}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.weight}
                    name="weight"
                    placeholder="0"
                    suffix="kg"
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.weight ? errors.weight : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="價格" colon={false} required={true}>
                <div style={{ display: "inline-block" }}>
                  <InputNumber
                    style={{ width: "10rem", display: "block" }}
                    min={0}
                    max={1000}
                    precision={0}
                    onChange={(value) => {
                      setFieldValue("price", value, false);
                    }}
                    onBlur={handleBlur}
                    value={values.price}
                    name="price"
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.price ? errors.price : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around" style={{ width: "100vw" }}>
            <Col span={8}>
              <Form.Item required={true} label="描述" colon={false}>
                <div style={{ display: "inline-block" }}>
                  <Input.TextArea
                    style={{ width: "60vw", height: "30vh" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                  />
                  <br />
                  <label style={{ width: "2rem" }}>{`${getDescriptionLength(
                    values.description
                  )}/3000`}</label>
                  &nbsp;&nbsp;&nbsp;
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.description ? errors.description : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around" style={{ width: "100vw" }}>
            <Col span={7}>
              <Form.Item label="使用方式" colon={false}>
                <div style={{ display: "inline-block" }}>
                  <Input
                    style={{ width: "15rem", display: "block" }}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.instruction}
                    name="instruction"
                    placeholder="請輸入"
                    suffix={`${values.instruction.length}/15`}
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.instruction ? errors.instruction : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label="上限"
                colon={false}
                required={values.hasUpperLimit}
              >
                <div style={{ display: "inline-block" }}>
                  <Switch
                    style={{ display: "inline" }}
                    onChange={(value) => {
                      setFieldValue("hasUpperLimit", value, false);
                      if (!value) {
                        setFieldValue("upperLimit", "", false);
                      }
                    }}
                    onBlur={handleBlur}
                    checked={values.hasUpperLimit}
                    value={values.hasUpperLimit}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Input
                    style={{ width: "12rem" }}
                    type="text"
                    disabled={!values.hasUpperLimit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.upperLimit}
                    name="upperLimit"
                    placeholder={values.hasUpperLimit ? "請輸入" : ""}
                    suffix={`${values.upperLimit.length}/10`}
                  />
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {values.hasUpperLimit
                      ? touched.upperLimit
                        ? errors.upperLimit
                        : null
                      : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="顏色" colon={false} required={true}>
                <div style={{ display: "inline-block" }}>
                  <Select
                    style={{ width: "8rem" }}
                    mode="multiple"
                    placeholder="請選擇"
                    value={values.color}
                    name="color"
                    onChange={(value) => {
                      value.sort();
                      setFieldValue("color", value, true);
                    }}
                    /*好像有問題 回傳的值與onChange相同*/
                    onBlur={() => {
                      setFieldTouched("color", true);
                    }}
                  >
                    {FORM_COLOR_OPTION.map((val, index) => {
                      return (
                        <Select.Option value={index} key={index}>
                          {val}
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <label style={{ color: "red", fontSize: "0.5rem" }}>
                    {touched.color ? errors.color : null}
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-around" style={{ width: "100vw" }}>
            <DateTimePickerStartEnd
              startDate={values.startDate}
              startTime={values.startTime}
              endDate={values.endDate}
              endTime={values.endTime}
              value={values.startEndDateTime}
              name="startEndDateTime"
              errorMessage={
                touched.startEndDateTime ? errors.startEndDateTime : null
              }
              onBlur={() => {
                setFieldTouched("startEndDateTime", true);
              }}
            />

            <Col span={8}>
              <Form.Item label="性別" colon={false} required={true}>
                <Radio.Group
                  onChange={handleChange}
                  value={values.gender}
                  name="gender"
                >
                  {GENDER_OPTION.map((val, id) => {
                    return (
                      <Radio value={id} key={id}>
                        {val}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              margin: "0px auto",
              width: "15rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {formMode === FORM_MODE.ADD ? (
              <Button
                onClick={() => {
                  handleReset();
                }}
              >
                Reset Form
              </Button>
            ) : null}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ValidationFormInFormik;
