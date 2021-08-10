import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "antd";
import ValidationForm from "./ValidationForm";
import ValidationTable from "./ValidationTable";
import { useCallback } from "react";
import ValidationSearch from "./ValidationSearch";
import { FORM_MODE } from "./Constant";

export const MyContext = React.createContext();
const TrainingTwo = () => {
  const [formMode, setFormMode] = useState(FORM_MODE.ADD);
  const [formVisible, setFormVisible] = useState(false);
  const [validationFormList, setValidationFormList] = useState(null);
  const [searchResultList, setSearchResultList] = useState(null);
  const [formTargerSerialNumber, setFormTargerSerialNumber] = useState(null);

  const showForm = useCallback((mode, serialNumber) => {
    if (serialNumber) {
      console.log(serialNumber);
      setFormTargerSerialNumber(serialNumber);
    } else {
      setFormTargerSerialNumber(null);
    }

    setFormVisible(true);
    setFormMode(mode);
  }, []);

  const updateValidationFormList = useCallback(
    (itemData) => {
      let newList = { ...validationFormList };
      delete newList.isEditMode;
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

  const updateSearchResultByCondition = useCallback(
    (condition) => {
      setSearchResultList({});
      const seachNumber = condition.serialNumber;
      let tempSearchResult = {};
      Object.keys(validationFormList).forEach((val) => {
        let isSerialNumberOK = false;
        let isGenderOK = false;

        if (val.includes(seachNumber)) {
          isSerialNumberOK = true;
        }

        if (condition.gender === validationFormList[val].gender) {
          isGenderOK = true;
        }

        if (isSerialNumberOK && isGenderOK) {
          tempSearchResult[val] = validationFormList[val];
        }
      });
      setSearchResultList({ ...tempSearchResult });
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
      let keysString = JSON.stringify(Object.keys(validationFormList));
      localStorage.setItem("validationFormData", listString);
      localStorage.setItem("validationFormKeys", keysString);
    }
  }, [validationFormList]);

  return (
    <MyContext.Provider
      value={{
        formTargerSerialNumber,
        validationFormList,
        searchResultList,
        formMode,
        formVisible,
        updateValidationFormList,
        deleteValidationFormItem,
        showConfirmModal,
        updateSearchResultByCondition,
        setSearchResultList,
        setFormMode,
        setFormVisible,
        showForm,
      }}
    >
      <div style={{ margin: "2rem" }}>
        <ValidationSearch />
        <br />
        <hr />
        <br />
        <ValidationTable />
        <ValidationForm
          formMode={formMode}
          formVisible={formVisible}
          formTargerSerialNumber={formTargerSerialNumber}
        />
      </div>
    </MyContext.Provider>
  );
};

export default TrainingTwo;
