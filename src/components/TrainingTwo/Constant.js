
import moment from "moment";

export const FORM_MODE = Object.freeze({ EDIT: 1, ADD: 2, VIEW: 3 });

export const FORM_COLOR_OPTION = ["紅色", "橙色", "黃色", "綠色", "藍色", "靛色", "紫色", "黑色", "白色"];
export const GENDER_OPTION = ["男", "女"];

export const VALIDATION_TABLE_COLUMNS = [
    {
        title: "編號",
        dataIndex: "serialNumber",
        key: "serialNumber",
        sorter: (a, b) => (parseInt(a.serialNumber) - parseInt(b.serialNumber)),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: "組織名稱",
        dataIndex: "organizationName",
        key: "organizationName",
    },
    {
        title: "重量",
        dataIndex: "weight",
        key: "weight",
    },
    {
        title: "價錢",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => (a.price - b.price),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: "描述",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "使用方式",
        dataIndex: "instruction",
        key: "instruction",
    },
    {
        title: "上限",
        dataIndex: "upperLimit",
        key: "upperLimit",
    },
    {
        title: "顏色",
        dataIndex: "color",
        key: "color",
    },
    {
        title: "開始時間",
        dataIndex: "startDateTime",
        key: "startDateTime",
        sorter: (a, b) => (moment(a.startDateTime) - moment(b.startDateTime)),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: "結束時間",
        dataIndex: "endDateTime",
        key: "endDateTime",
        sorter: (a, b) => (moment(a.endDateTime) - moment(b.endDateTime)),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: "性別",
        dataIndex: "gender",
        key: "gender",
    },
    {
        title: "動作",
        dataIndex: "action",
        key: "action",
    },
];