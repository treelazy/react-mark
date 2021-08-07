import { Formik } from "formik";
import { Form, Input, Row, Col } from "antd";
import React from "react";
import { valuesSchema } from "./validationSchema";

const ValidationForm = () => {
  let initFormikValue = () => {
    const value = {
      serialNumber: "",
      organizationName: "",
      weight: null,
    };
    return value;
  };

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
                        style={{ width: "20rem", display: "block" }}
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
                        {props.errors.touched ? props.errors.weight : null}
                      </label>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          );
        }}
      ></Formik>
    </div>
  );
};

export default ValidationForm;
