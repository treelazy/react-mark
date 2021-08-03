import React, { Component } from 'react'
import 'antd/dist/antd.css';
import MyForm from './components/MyForm';
import TodoTable from './components/TodoTable';


export default class App extends Component {
  render() {
    return (
      <div>
        <MyForm />
        <hr />
        <TodoTable />
      </div>
    )
  }
}
