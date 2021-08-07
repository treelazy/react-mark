import React from "react";
import { initTodoList } from "./redux/store";
import { connect } from "react-redux";
import { useEffect } from "react";
//import TrainingOne from "./components/TrainingOne";
import "antd/dist/antd.css";
import TrainingTwo from "./components/TrainingTwo/TrainingTwo";

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
    <div>
      {
        //TrainingOne
        //<TrainingOne />
      }
      {
        //TrainingTwo
        <TrainingTwo />
      }
    </div>
  );
};

const mapDispatchToProps = { initTodoList };
export default connect(null, mapDispatchToProps)(App);
