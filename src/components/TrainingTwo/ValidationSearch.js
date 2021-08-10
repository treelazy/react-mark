import React from "react";
import { Formik } from "formik";
import { Button, Input, Radio } from "antd";
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

  return (
    <div /*style={{ height: "20rem" }}*/>
      <div>
        <Formik
          initialValues={initFormikValue()}
          onSubmit={null}
          validationSchema={valuesSearchSchema}
        >
          {(props) => {
            return (
              <div>
                <div
                  style={{
                    margin: "0px auto",
                    width: "50rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <label>編號</label> &nbsp;&nbsp;&nbsp;
                    <Input
                      style={{ width: "12rem" }}
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
                  <div>
                    <label>性別</label> &nbsp;&nbsp;&nbsp;
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
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div
                  style={{
                    margin: "0px auto",
                    width: "15rem",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => {
                      updateSearchResultByCondition(props.values);
                      console.log(props.values);
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    onClick={() => {
                      setSearchResultList(null);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => {
                      showForm(FORM_MODE.ADD);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ValidationSearch;
