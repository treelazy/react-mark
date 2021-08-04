import React, { Component } from 'react'
import 'antd/dist/antd.css';
import MyForm from './components/MyForm';
import { initTodoList } from './redux/store';
import { connect } from 'react-redux';
import TodoTable from './components/TodoTable';

class App extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
  }

  componentDidMount() {
    console.log('App componentDidMount');
    let todoListString = localStorage.getItem("todoListData");
    let todoList = null;
    if (!todoListString) {
      todoList = {};
    } else {
      todoList = JSON.parse(todoListString);
      this.props.initTodoList(todoList);
    }
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate')
  }

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


const mapDispatchToProps = { initTodoList };

export default connect(null, mapDispatchToProps)(App);