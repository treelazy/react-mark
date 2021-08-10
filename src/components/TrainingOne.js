import React from "react";
import MyForm from "./MyForm";
import SearchForm from "./SearchForm";
import TodoTable from "./TodoTable";

const TrainingOne = () => {
  return (
    <div style={{ margin: "2rem" }}>
      <SearchForm />
      <hr />
      <TodoTable />
      <MyForm />
    </div>
  );
};

export default TrainingOne;
