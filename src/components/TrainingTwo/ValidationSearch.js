import React from "react";
import { Formik } from "formik";
import { Form, Button, Input, Radio, Row, Col } from "antd";
import { valuesSearchSchema } from "./validationSchema";
import { FORM_MODE, GENDER_OPTION } from "./Constant";
import { useContext } from "react";
import { MyContext } from "./TrainingTwo";
const ValidationSearch = () => {
  const { updateSearchResultByCondition, setSearchResultList, showForm } =
    useContext(MyContext);

  let initFormikValue = () => {
    const value = {
      serialNumber: "",
      gender: 0,
    };
    return value;
  };

  const layout = {
    labelCol: { sm: { span: 24 }, md: { span: 6 } },
    wrapperCol: { sm: { span: 24 }, md: { span: 18 } },
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={initFormikValue()}
          onSubmit={null}
          validationSchema={valuesSearchSchema}
        >
          {(props) => {
            return (
              <div>
                <Form {...layout}>
                  <Row gutter={[16, 16]} type="flex" justify="center">
                    <Col sm={24} md={2} xl={6}></Col>
                    <Col sm={24} md={10} xl={6}>
                      <Form.Item
                        label="編號"
                        colon={false}
                        validateStatus={
                          props.touched.serialNumber &&
                          props.errors.serialNumber
                            ? "error"
                            : "success"
                        }
                        help={
                          props.touched.serialNumber
                            ? props.errors.serialNumber
                            : ""
                        }
                      >
                        <Input
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.serialNumber}
                          name="serialNumber"
                          placeholder="請輸入"
                          suffix={`${props.values.serialNumber.length}/10`}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={10} xl={6}>
                      <Form.Item label="性別" colon={false}>
                        <Radio.Group
                          onChange={props.handleChange}
                          value={props.values.gender}
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
                    <Col sm={24} md={2} xl={6}></Col>
                  </Row>
                  <br />
                  <Row type="flex" justify="center">
                    <Col sm={4} md={3} xl={2}></Col>
                    <Col sm={4} md={3} xl={2}></Col>
                    <Col sm={4} md={3} xl={2}></Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          updateSearchResultByCondition(props.values);
                        }}
                      >
                        Search
                      </Button>
                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                          setSearchResultList(null);
                        }}
                      >
                        Reset
                      </Button>

                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => {
                          showForm(FORM_MODE.ADD);
                        }}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ValidationSearch;
