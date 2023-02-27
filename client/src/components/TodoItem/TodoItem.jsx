import React, { useCallback, useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import updateTodoRequest from "../../api/updateTodoRequest";
import deleteTodoRequest from "../../api/deleteTodoRequest";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import "./TodoItem.css";

const TodoItem = ({ todo }) => {
  const [text, setText] = useState(todo.text);

  const queryClient = useQueryClient();



  const { mutate: updateTodo } = useMutation(
    (updatedTodo) => updateTodoRequest(updatedTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const debounceUpdateTodo = useCallback(debounce(updateTodo, 700), [
    updateTodo,
  ]);

  const { mutate: deleteTodo } = useMutation(
    (updatedTodo) => deleteTodoRequest(updatedTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  useEffect(() => {
    if (text !== todo.text) {
      debounceUpdateTodo({
        ...todo,
        text,
      });
    }
  }, [text]);

  return (
    <div className="item">
      
      <Checkbox
        checked={todo.completed}
        type="checkbox"
        onChange={() =>
          updateTodo({
            ...todo,
            completed: !todo.completed,
          })
        }
      />

      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        className="TextField"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />


      <Button variant="contained" onClick={() => deleteTodo(todo)}>Eliminar</Button> 
    </div>
  );
};

export default TodoItem;
