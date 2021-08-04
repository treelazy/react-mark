import { createStore } from 'redux'

const TODOLIST_INIT = 'TODOLIST_INIT';
const TODOLIST_UPDATE = 'TODOLIST_UPDATE';
const TODOLIST_DELETE_ITEM = 'TODOLIST_DELETE_ITEM';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const SET_EDIT_ITEM_UUID = 'SET_EDIT_ITEM_UUID';

// 初始狀態寫在Reducer 參數初始值

const initState = {
    todoList: {},
    isMyFormEditMode: false,
    editItemUuid: '',
    lastActionType: null,
}

function dataReducer(state = initState, action) {
    state.lastActionType = action.type
    switch (action.type) {
        case TODOLIST_INIT:
            state.todoList = action.payload;
            state.todoList = { ...state.todoList };
            return { ...state }
        //return Object.assign({}, state)
        case TODOLIST_UPDATE:
            // 回傳時要創造一個新的object 不能直接修改原本的值後回傳
            let { uuid } = action.payload
            state.todoList[uuid] = action.payload;
            state.todoList = { ...state.todoList };
            return { ...state };
        //return Object.assign({}, state)
        case TODOLIST_DELETE_ITEM:
            let id = action.payload;
            delete state.todoList[id];
            state.todoList = { ...state.todoList };
            return { ...state };
        //return Object.assign({}, state)
        case SET_EDIT_MODE:
            state.isMyFormEditMode = action.payload;
            if (action.payload === false) {
                state.editItemUuid = '';
            }
            return { ...state };
        case SET_EDIT_ITEM_UUID:
            state.editItemUuid = action.payload
            return { ...state };
        default:
            return state;
    }
}

const store = createStore(
    dataReducer,
);


store.subscribe(() => {

    console.log(store.getState());

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
export const setMyFormIsEditMode = (b) => ({ type: SET_EDIT_MODE, payload: b })
export const setEditItemUuid = (uuid) => ({ type: SET_EDIT_ITEM_UUID, payload: uuid })

export default store;