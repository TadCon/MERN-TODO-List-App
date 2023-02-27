import React, { useState } from "react";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import readTodosRequest from "../../api/readTodosRequest";
import TodoItem from "../../components/TodoItem/TodoItem";
import CreateTodoForm from "../../components/CreateTodoForm/CreateTodoForm";
import './TodoPage.css'

const TodoPage = () => {
  const { isLoading, data: todos } = useQuery("todos", readTodosRequest);
  const [filter, setFilter] = useState("all"); //El filtro inicia con todas las listas

  const filterTodos = () => {
    let filteredTodos = todos;
    if (filter === "completed") {
      filteredTodos = todos.filter((todo) => todo.completed === true);
    } else if (filter === "uncompleted") {
      filteredTodos = todos.filter((todo) => todo.completed === false);
    }
    return filteredTodos;
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h1>MERN APP | TODO List</h1>
      <InputLabel id="demo-simple-select-label">Filtrar tareas:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        className="Select"
        value={filter}
        label="todo-filter"
        onChange={(e) => changeFilter(e.target.value)}
      >
        <MenuItem value="all" selected>
          Todos
        </MenuItem>
        <MenuItem value="completed">Completado</MenuItem>
        <MenuItem value="uncompleted">Pendiente</MenuItem>
      </Select>

      <CreateTodoForm />
      {isLoading ? (
        <ClipLoader size={250} />
      ) : (
        filterTodos().map((todo) => <TodoItem todo={todo} key={todo._id} />)
      )}
    </div>
  );
};

export default TodoPage;
