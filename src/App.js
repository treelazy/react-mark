import React, { Component } from 'react'
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import MyForm from './components/MyForm';
import { initTodoList } from './redux/store';
import { connect } from 'react-redux';
import TodoTable from './components/TodoTable';
import SearchForm from './components/SearchForm';


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
        <Row>
          <Col span={12}><MyForm /></Col>
          <Col span={12}><SearchForm /></Col>
        </Row>
        <hr />
        <TodoTable />
      </div>
    )
  }
}


const mapDispatchToProps = { initTodoList };

export default connect(null, mapDispatchToProps)(App);