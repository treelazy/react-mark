import * as Yup from "yup";

export const valuesSchema = Yup.object().shape({
    serialNumber: Yup.string().required("此欄位必填").max(10, "請輸入1-10個半形數字").matches(/^[^ ]+$/, "此欄位不支援空白").matches(/^[0-9]*$/, "請輸入半形數字"),
    organizationName: Yup.string().max(15, "請輸入1-15個中文，英文/數字").matches(/^[\u4e00-\u9fa5<>/\w]*$/, "請輸入中文，英文/數字"),
});