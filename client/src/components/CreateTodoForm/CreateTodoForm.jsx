import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import TextField from "@mui/material/TextField";
import createTodoRequest from "../../api/createTodoRequest";
import './CreateTodoForm.css'

const createTodoForm = () => {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  //Crear tarea
  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <form
      className="input-create"
      onSubmit={(e) => {
        e.preventDefault();
        if (text) {
          //Chequea que haya texto en el input
          createTodo({
            text,
          });
          setText(""); //Vacía el input después del envío
        }
      }}
    >
      <TextField
        id="filled-basic"
        variant="filled"
        label="Ingrese aquí una nueva tarea"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button className="button-submit" type="submit" variant="contained">Crear</button>
    </form>
  );
};

export default createTodoForm;
