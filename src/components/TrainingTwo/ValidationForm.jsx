import { Formik } from "formik";
import { Form, Input, Row, Col, Switch } from "antd";
import React from "react";
import { getDescriptionLength, valuesSchema } from "./validationSchema";

const ValidationForm = () => {
  let initFormikValue = () => {
    const value = {
      serialNumber: "",
      organizationName: "",
      weight: "",
      description: "",
      instruction: "",
      hasUpperLimit: false,
      upperLimit: "",
    };
    return value;
  };
  // isNthPositiveFloat: n => new RegExp(`^(0|[1-9][0-9]*)(\\.[0-9]{1,${n}})?$`),
  return (
    <div>
      <Formik
        initialValues={initFormikValue()}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
        validationSchema={valuesSchema}
        render={(props) => {
          const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };
          return (
            <Form {...layout}>
              <Row justify="space-around" style={{ width: "100vw" }}>
                <Col span={8}>
                  <Form.Item label="編號" required={true} colon={false}>
                    <div style={{ display: "inline-block" }}>
                      <Input
                        style={{ width: "12rem", display: "block" }}
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.serialNumber}
                        name="serialNumber"
                        placeholder="請輸入"
                        suffix={`${props.values.serialNumber.length}/10`}
                      />
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.touched.serialNumber
                          ? props.errors.serialNumber
                          : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="組織名稱" colon={false}>
                    <div style={{ display: "inline-block" }}>
                      <Input
                        style={{ width: "15rem", display: "block" }}
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.organizationName}
                        name="organizationName"
                        placeholder="請輸入"
                        suffix={`${props.values.organizationName.length}/15`}
                      />
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.touched.organizationName
                          ? props.errors.organizationName
                          : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="重量" colon={false}>
                    <div style={{ display: "inline-block" }}>
                      <Input
                        style={{ width: "10rem", display: "block" }}
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.weight}
                        name="weight"
                        placeholder="0"
                        suffix="kg"
                      />
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.touched.weight ? props.errors.weight : null}
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
                        name="description"
                      />
                      <br />
                      <label style={{ width: "2rem" }}>{`${getDescriptionLength(
                        props.values.description
                      )}/3000`}</label>
                      &nbsp;&nbsp;&nbsp;
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.touched.description
                          ? props.errors.description
                          : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-around" style={{ width: "100vw" }}>
                <Col span={8}>
                  <Form.Item label="使用方式" colon={false}>
                    <div style={{ display: "inline-block" }}>
                      <Input
                        style={{ width: "15rem", display: "block" }}
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.instruction}
                        name="instruction"
                        placeholder="請輸入"
                        suffix={`${props.values.instruction.length}/15`}
                      />
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.touched.instruction
                          ? props.errors.instruction
                          : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="上限"
                    colon={false}
                    required={props.values.hasUpperLimit}
                  >
                    <div style={{ display: "inline-block" }}>
                      <Switch
                        style={{ display: "inline" }}
                        onChange={(value) => {
                          props.setFieldValue("hasUpperLimit", value, false);
                          if (!value) {
                            props.setFieldValue("upperLimit", "", false);
                          }
                        }}
                        onBlur={props.handleBlur}
                        checked={props.values.hasUpperLimit}
                        value={props.values.hasUpperLimit}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <Input
                        style={{ width: "12rem" }}
                        type="text"
                        disabled={!props.values.hasUpperLimit}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.upperLimit}
                        name="upperLimit"
                        placeholder={props.values.hasUpperLimit ? "請輸入" : ""}
                        suffix={`${props.values.upperLimit.length}/10`}
                      />
                      <label style={{ color: "red", fontSize: "0.5rem" }}>
                        {props.values.hasUpperLimit
                          ? props.touched.upperLimit
                            ? props.errors.upperLimit
                            : null
                          : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <button
                onClick={() => {
                  let a = { a: props.values.description };
                  console.log(a);
                }}
              >
                click
              </button>
            </Form>
          );
        }}
      ></Formik>
    </div>
  );
};

export default ValidationForm;
