import React from "react";
import { initTodoList } from "./redux/store";
import { connect } from "react-redux";
//import TrainingOne from "./components/TrainingOne";
import "antd/dist/antd.css";
import TrainingTwo from "./components/TrainingTwo/TrainingTwo";

const App = (props) => {
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
