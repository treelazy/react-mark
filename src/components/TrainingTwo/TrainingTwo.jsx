import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "antd";
import ValidationForm from "./ValidationForm";
import ValidationTable from "./ValidationTable";
import { useCallback } from "react";

export const MyContext = React.createContext();
const TrainingTwo = () => {
  const [validationFormList, setValidationFormList] = useState(null);

  const updateValidationFormList = useCallback(
    (itemData) => {
      let newList = { ...validationFormList };
      newList[itemData.serialNumber] = itemData;
      setValidationFormList(newList);
    },
    [validationFormList]
  );

  const deleteValidationFormItem = useCallback(
    (serialNumber) => {
      let list = { ...validationFormList };
      delete list[serialNumber];
      setValidationFormList(list);
    },
    [validationFormList]
  );

  const showConfirmModal = useCallback(
    (title, text, okText, cancelText, onOkClickCB) => {
      Modal.confirm({
        okText,
        cancelText,
        title,
        content: <h1>{text}</h1>,
        onOk: onOkClickCB,
      });
    },
    []
  );

  // 從localStorage拿出字串初始化
  useEffect(() => {
    let localStorageStr = localStorage.getItem("validationFormData");
    if (localStorageStr) {
      setValidationFormList(JSON.parse(localStorageStr));
    } else {
      setValidationFormList({});
    }
  }, []);

  // validationFormList 變動時 回存資料
  useEffect(() => {
    if (validationFormList !== null) {
      let listString = JSON.stringify(validationFormList);
      localStorage.setItem("validationFormData", listString);
    }
  }, [validationFormList]);

  return (
    <MyContext.Provider
      value={{
        validationFormList,
        updateValidationFormList,
        deleteValidationFormItem,
        showConfirmModal,
      }}
    >
      <div style={{ margin: "2rem" }}>
        <ValidationForm />
        <br />
        <hr />
        <br />
        <ValidationTable />
      </div>
    </MyContext.Provider>
  );
};

export default TrainingTwo;
