import { Button, Table } from "antd";
import React, { Component } from "react";

export default class TodoTable extends Component {
  
  constructor(props) {
    super(props);
    this.props = props;

    this.onEditBtnClick = this.onEditBtnClick.bind(this);
  }

  onEditBtnClick(uuid){
    console.log(uuid);
  }


  getDataSource(){

    let priorityMap = {
      1:'普通',
      2:'重要',
      3:'緊急',
    }

    let dataSource = [];
    let todoListString = localStorage.getItem("todoListData");
    let todoList = {};
    if (!todoListString) {
      todoList = {};
    } else {
      todoList = JSON.parse(todoListString)
    }
    Object.keys(todoList).forEach((key, index)=>{
      let obj = {...todoList[key]};
      obj['selectValue'] = priorityMap[obj['selectValue']]
      obj['radioValue'] = priorityMap[obj['radioValue']]
      obj['switchValue'] = obj['switchValue']? '已完成' : '未完成';
      obj['key'] = index;
      obj['edit'] = <Button id={obj['uuid']} type="primary" htmlType="button" onClick={()=>{
        this.onEditBtnClick(obj['uuid']);
      }}>Edit</Button>
      dataSource.push(obj);
      
    });
    return dataSource;
  }

  render() {
    
    const columns = [
      {
        title: '事件',
        dataIndex: 'inputTextValue',
        key: 'inputTextValue',
      },
      {
        title: '緊急程度',
        dataIndex: 'selectValue',
        key: 'selectValue',
      },
      {
        title: '多重選擇',
        dataIndex: 'multipleSelectValue',
        key: 'multipleSelectValue',
      },
      {
        title: '緊急程度2',
        dataIndex: 'radioValue',
        key: 'radioValue',
      },
      {
        title: '日期',
        dataIndex: 'datePickerString',
        key: 'datePickerString',
      },
      {
        title: '時間',
        dataIndex: 'timePickerString',
        key: 'timePickerString',
      },
      {
        title: '是否完成',
        dataIndex: 'switchValue',
        key: 'switchValue',
      },
      {
        title: '編輯',
        dataIndex: 'edit',
        key: 'edit',
      }
    ];
    
    

    return <div>
      <Table dataSource={this.getDataSource()} columns={columns} />;
    </div>;
  }
}
