import React, { useState } from "react";
import { useEffect } from "react";
import ValidationForm from "./ValidationForm";
import { Modal } from "antd";

export const MyContext = React.createContext();
const TrainingTwo = () => {
  const [validationFormList, setValidationFormList] = useState({});

  const updateValidationFormList = (itemData) => {
    let newList = { ...validationFormList };
    newList[itemData.serialNumber] = itemData;
    setValidationFormList(newList);
  };

  const showConfirmModal = (title, text) => {
    Modal.confirm({ title: title, content: <h1>{text}</h1> });
  };

  useEffect(() => {
    let listString = JSON.stringify(validationFormList);
    localStorage.setItem("validationFormData", listString);
    showConfirmModal("123");
  }, [validationFormList]);

  return (
    <MyContext.Provider
      value={{ validationFormList, updateValidationFormList }}
    >
      <div style={{ margin: "2rem" }}>
        <ValidationForm />
      </div>
    </MyContext.Provider>
  );
};

export default TrainingTwo;
