import { Formik } from "formik";
import React from "react";
import { valuesSchema } from "./validationSchema";

import ValidationFormInFormik from "./ValidationFormInFormik";
const ValidationForm = () => {
  let initFormikValue = () => {
    const value = {
      serialNumber: "",
      organizationName: "",
      weight: "0",
      price: 0,
      description: "",
      instruction: "",
      hasUpperLimit: false,
      upperLimit: "",
      color: [],
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      startEndDateTime: [null, null, null, null],
      gender: 0,
      isEditMode: false,
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
      >
        {(props) => {
          return <ValidationFormInFormik />;
        }}
      </Formik>
    </div>
  );
};

export default ValidationForm;
