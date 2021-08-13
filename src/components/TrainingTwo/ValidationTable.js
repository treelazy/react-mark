import { Button, Table, message, Typography } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { FORM_COLOR_OPTION, FORM_MODE, GENDER_OPTION, VALIDATION_TABLE_COLUMNS } from "./Constant";
import { MyContext } from "./TrainingTwo";
const { Title } = Typography;
const ValidationTable = () => {
  const {
    validationFormList,
    searchResultList,
    deleteValidationFormItem,
    showConfirmModal,
    showForm,
  } = useContext(MyContext);
  const [tableDataSource, setTableDataSource] = useState([]);
  const [title, setTitle] = useState("全部資料");
  useEffect(() => {
    let dataSource = [];
    let targetList = null;
    if (!validationFormList) {
      return;
    }
    targetList = validationFormList;
    setTitle("全部資料");
    if (searchResultList !== null) {
      targetList = searchResultList;
      setTitle("搜尋結果");
      if (Object.keys(searchResultList).length === 0) {
        setTitle("查無資料");
      }
    }

    Object.keys(targetList).forEach((key, index) => {
      let item = { ...targetList[key] };
      let dataSourceItem = {};
      dataSourceItem.key = item.serialNumber;
      dataSourceItem.serialNumber = item.serialNumber;
      dataSourceItem.organizationName = item.organizationName
        ? item.organizationName
        : "-";
      dataSourceItem.weight = item.weight ? item.weight : "-";
      dataSourceItem.price = item.price;
      dataSourceItem.description = item.description ? (item.description.length > 3 ? `${item.description.substring(0, 3)}...` : item.description) : "-";
      dataSourceItem.instruction = item.instruction ? item.instruction : "-";
      dataSourceItem.upperLimit = item.hasUpperLimit
        ? item.upperLimit
        : "-";
      dataSourceItem.color = item.color.length > 0 ? item.color.map((val) => `${FORM_COLOR_OPTION[val]} `) : "-";
      dataSourceItem.startDateTime = `${item.startEndDateTime[0]} ${item.startEndDateTime[1]}`;
      dataSourceItem.endDateTime = `${item.startEndDateTime[2]} ${item.startEndDateTime[3]}`;
      dataSourceItem.gender = GENDER_OPTION[item.gender];
      dataSourceItem.action = (
        <div>
          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            id={item.serialNumber}
            htmlType="button"
            onClick={() => {
              showForm(FORM_MODE.EDIT, item.serialNumber);
            }}
          >
            Edit
          </Button>

          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            id={item.serialNumber}
            htmlType="button"
            onClick={() => {
              //onViewBtnClick(item.serialNumber);
              showForm(FORM_MODE.VIEW, item.serialNumber)
            }}
          >
            View
          </Button>

          <Button
            style={{ marginLeft: 8, marginBottom: 8 }}
            id={item.serialNumber}
            type="danger"
            htmlType="button"
            onClick={() => {
              const okCB = () => {
                deleteValidationFormItem(item.serialNumber);
                message.success("刪除成功!");
              };
              showConfirmModal(
                "Confirm",
                "確定要刪除嗎?",
                "OK",
                "Cancel",
                okCB
              );
            }}
          >
            Delete
          </Button>
        </div>
      );

      dataSource[index] = { ...dataSourceItem };
    });
    setTableDataSource(dataSource);
  }, [
    validationFormList,
    showConfirmModal,
    deleteValidationFormItem,
    searchResultList,
    showForm,
  ]);

  const pagination = {
    position: "top",
    showSizeChanger: true,
    pageSizeOptions: ["20", "50", "100", "200", "500"],
    defaultPageSize: 20,
  };

  return (
    <div>
      <Title>{title}</Title>
      <Table
        pagination={pagination}
        dataSource={tableDataSource}
        columns={VALIDATION_TABLE_COLUMNS}
      />
    </div>
  );
};

export default ValidationTable;
