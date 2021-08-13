import { createStore } from 'redux'
import moment from "moment";

const TODOLIST_INIT = 'TODOLIST_INIT';
const TODOLIST_UPDATE = 'TODOLIST_UPDATE';
const TODOLIST_DELETE_ITEM = 'TODOLIST_DELETE_ITEM';
const SET_UUID_FROM_TABLE = 'SET_UUID_FROM_TABLE';
const SEARCH_BY_CONDITION = 'SEARCH_BY_CONDITION';
const CLEAR_SEARCH_RESULT_LIST = 'CLEAR_SEARCH_RESULT_LIST';

const SET_ADD_FORM_TRIGGER = 'SET_ADD_FORM_TRIGGER';
const SET_EDIT_FORM_TRIGGER = 'SET_EDIT_FORM_TRIGGER';
const SET_VIEW_FORM_TRIGGER = 'SET_VIEW_FORM_TRIGGER'


// 初始狀態寫在Reducer 參數初始值
const initState = {
    todoList: {},
    searchResultList: null,
    uuidFromTable: '',
    formMode: null,
    lastActionType: null,
    showAddFormTrigger: false,
    showEditFormTrigger: false,
    showViewFormTrigger: false,
};

function dataReducer(state = initState, action) {
    state.lastActionType = action.type
    switch (action.type) {
        case TODOLIST_INIT:
            state.todoList = action.payload;
            state.todoList = { ...state.todoList };
            return { ...state };
        case TODOLIST_UPDATE:
            // 回傳時要創造一個新的object 不能直接修改原本的值後回傳
            let { uuid } = action.payload
            state.todoList[uuid] = action.payload;
            state.todoList = { ...state.todoList };

            // 如果搜尋結果中存在,一併更新
            if (state.searchResultList && state.searchResultList[uuid]) {
                state.searchResultList[uuid] = action.payload;
                state.searchResultList = { ...state.searchResultList };
            }
            return { ...state };
        case TODOLIST_DELETE_ITEM:
            let deleteID = action.payload;
            delete state.todoList[deleteID];
            state.todoList = { ...state.todoList };

            // 如果搜尋結果中存在,一併刪除
            if (state.searchResultList && state.searchResultList[deleteID]) {
                delete state.searchResultList[deleteID];
                state.searchResultList = { ...state.searchResultList };
            }

            return { ...state };
        case SET_UUID_FROM_TABLE:
            state.uuidFromTable = action.payload;
            return { ...state };
        case SEARCH_BY_CONDITION:
            let condition = action.payload;
            let searchResult = {};
            Object.keys(state.todoList).forEach((key) => {
                let val = state.todoList[key];
                let isSwitchValueOK = false;
                let isInputTextValueOK = false;
                let isSelectValueOK = false;
                let isRadioValueOK = false;
                let isDateStartOK = false;
                let isDateEndOK = false;
                if (val.switchValue === condition.searchSwitchValue) {
                    isSwitchValueOK = true;
                }
                if (condition.searchInputTextValue === '' || val.inputTextValue.includes(condition.searchInputTextValue)) {
                    isInputTextValueOK = true;
                }
                if (condition.searchSelectValue === null || val.selectValue === condition.searchSelectValue) {
                    isSelectValueOK = true;
                }
                if (condition.searchRadioValue === null || val.radioValue === condition.searchRadioValue) {
                    isRadioValueOK = true;
                }
                if (condition.searchStartDateString === null || moment(condition.searchStartDateString) <= moment(val.datePickerString)) {
                    isDateStartOK = true;
                }
                if (condition.searchEndDateString === null || moment(condition.searchEndDateString) >= moment(val.datePickerString)) {
                    isDateEndOK = true;
                }
                //----------------------------------------------------------------------------------------------
                if (isSwitchValueOK && isInputTextValueOK && isSelectValueOK && isRadioValueOK && isDateStartOK && isDateEndOK) {
                    searchResult[key] = val;
                }


            });

            state.searchResultList = searchResult;
            return { ...state };
        case CLEAR_SEARCH_RESULT_LIST:
            state.searchResultList = null;
            return { ...state };
        case SET_ADD_FORM_TRIGGER:
            state.showAddFormTrigger = action.payload;
            return { ...state };
        case SET_EDIT_FORM_TRIGGER:
            state.showEditFormTrigger = action.payload;
            return { ...state };
        case SET_VIEW_FORM_TRIGGER:
            state.showViewFormTrigger = action.payload;
            return { ...state };
        default:
            return state;
    }
}

const store = createStore(
    dataReducer,
);


store.subscribe(() => {

    // console.log(store.getState());

    switch (store.getState().lastActionType) {
        case TODOLIST_UPDATE:
        case TODOLIST_DELETE_ITEM:
            let todoListString = JSON.stringify(store.getState().todoList);
            localStorage.setItem("todoListData", todoListString);
            break;
        default:
    }

});

export const initTodoList = (data) => ({ type: TODOLIST_INIT, payload: data });
export const updateTodoList = (data) => ({ type: TODOLIST_UPDATE, payload: data });
export const deleteTodoListItem = (id) => ({ type: TODOLIST_DELETE_ITEM, payload: id });
export const setUuidFromTable = (uuid) => ({ type: SET_UUID_FROM_TABLE, payload: uuid });
export const searchByCondition = (condition) => ({ type: SEARCH_BY_CONDITION, payload: condition });
export const clearSearchResultList = () => ({ type: CLEAR_SEARCH_RESULT_LIST });
export const setAddFormTrigger = (b) => ({ type: SET_ADD_FORM_TRIGGER, payload: b });
export const setEditFormTrigger = (b) => ({ type: SET_EDIT_FORM_TRIGGER, payload: b });
export const setViewFormTrigger = (b) => ({ type: SET_VIEW_FORM_TRIGGER, payload: b });

export default store;