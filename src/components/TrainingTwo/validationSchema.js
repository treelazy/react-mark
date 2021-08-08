import * as Yup from "yup";

export const valuesSchema = Yup.object().shape({
    serialNumber: Yup.string().required("此欄位必填").max(10, "請輸入1-10個半形數字").matches(/^[^ ]+$/, "此欄位不支援空白").matches(/^[0-9]*$/, "請輸入半形數字"),
    organizationName: Yup.string().max(15, "請輸入1-15個中文，英文/數字").matches(/^[\u4e00-\u9fa5<>/\w]*$/, "請輸入中文，英文/數字"),
    weight: Yup.string().matches('^(0|[1-9][0-9]*)(\\.[0-9]{1,2})?$', "請輸入半形數字 0~9999999.99/小數點後限2位").test("", "請輸入半形數字 0~9999999.99/小數點後限2位", (v) => !v || Number(v) <= 999999999.99),
    description: Yup.string().required("此欄位必填").test("", "請輸入1-3000個字", (str) => !str || getDescriptionLength(str) <= 3000).test("", "此欄位不支援斷行", (str) => !str || str.search(/\n/) === -1)
});
//.matches(/[^\n]/g, '此欄位不支援斷行'),
export function getDescriptionLength(descriptionStr) {
    const str = descriptionStr;
    var arr = str.match(/[^x00-xff]/ig);
    const chineseCnt = (arr == null ? 0 : arr.length);
    const otherCharCnt = str.length - chineseCnt;
    const totalCnt = 3 * chineseCnt + otherCharCnt;
    return totalCnt;
}