import React from "react";
import "antd/dist/antd.css";
import MyForm from "./components/MyForm";
import { initTodoList } from "./redux/store";
import { connect } from "react-redux";
import TodoTable from "./components/TodoTable";
import SearchForm from "./components/SearchForm";
import { useEffect } from "react";

const App = (props) => {
  useEffect(() => {
    let todoListString = localStorage.getItem("todoListData");
    let todoList = null;
    if (!todoListString) {
      todoList = {};
    } else {
      todoList = JSON.parse(todoListString);
      props.initTodoList(todoList);
    }
    return () => {};
  });

  return (
    <div style={{ margin: "2rem" }}>
      <SearchForm />
      <hr />
      <TodoTable />
      <MyForm />
    </div>
  );
};

const mapDispatchToProps = { initTodoList };
export default connect(null, mapDispatchToProps)(App);
