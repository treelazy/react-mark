import { Button, Table, message } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GENDER_OPTION, VALIDATION_TABLE_COLUMNS } from "./Constant";
import { MyContext } from "./TrainingTwo";

const ValidationTable = () => {
  const { validationFormList, deleteValidationFormItem, showConfirmModal } =
    useContext(MyContext);
  const [tableDataSource, setTableDataSource] = useState([]);

  useEffect(() => {
    let dataSource = [];
    if (!validationFormList) {
      return;
    }

    Object.keys(validationFormList).forEach((key, index) => {
      let item = { ...validationFormList[key] };
      let dataSourceItem = {};
      dataSourceItem.key = item.serialNumber;
      dataSourceItem.serialNumber = item.serialNumber;
      dataSourceItem.organizationName = item.organizationName
        ? item.organizationName
        : "-";
      dataSourceItem.weight = item.weight ? item.weight : "-";
      dataSourceItem.price = item.price;
      dataSourceItem.description = item.description ? item.description : "-";
      dataSourceItem.instruction = item.instruction ? item.instruction : "-";
      dataSourceItem.upperLimit = item.hasUpperLimit
        ? dataSourceItem.upperLimit
        : "-";
      dataSourceItem.color = item.color.length > 0 ? item.color : "-";
      dataSourceItem.startDateTime = `${item.startEndDateTime[0]} ${item.startEndDateTime[1]}`;
      dataSourceItem.endDateTime = `${item.startEndDateTime[2]} ${item.startEndDateTime[3]}`;
      dataSourceItem.gender = GENDER_OPTION[item.gender];
      dataSourceItem.action = (
        <div>
          <Button
            id={item.serialNumber}
            htmlType="button"
            onClick={() => {
              //onEditBtnClick(item.serialNumber);
            }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            id={item.serialNumber}
            htmlType="button"
            onClick={() => {
              //onViewBtnClick(item.serialNumber);
            }}
          >
            View
          </Button>
        </div>
      );

      dataSource[index] = { ...dataSourceItem };
    });
    setTableDataSource(dataSource);
  }, [validationFormList, showConfirmModal, deleteValidationFormItem]);

  const pagination = {
    position: "top",
    showSizeChanger: true,
    pageSizeOptions: ["20", "50", "100", "200", "500"],
    defaultPageSize: 20,
  };

  return (
    <div>
      <Table
        pagination={pagination}
        dataSource={tableDataSource}
        columns={VALIDATION_TABLE_COLUMNS}
      />
    </div>
  );
};

export default ValidationTable;
