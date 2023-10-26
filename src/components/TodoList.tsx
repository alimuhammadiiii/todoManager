import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type Todo = {
  listId: string;
  content: string;
  completed: boolean;
  bookmarked: boolean;
};
function TodoList() {
  const [todoText, setTodo] = useState<string>("");
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: async (todoData: Todo) => {
      return (await axios.post("http://localhost:3000/todo", todoData)).data as Promise<Todo>;
    },
    onSuccess(todoData: Todo) {
      console.log(todoData.content);
    },
    onError(error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log(error);
          nav("/login");
        }
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <ul className="flex-1 h-full">List</ul>
      <div>
        <input value={todoText} onChange={(e) => setTodo(e.target.value)} type="text" />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );

  function handleAddTodo() {
    const todo: Todo = {
      listId: "ux2bwlvd5st69fsfc72vthzj",
      content: todoText,
      completed: false,
      bookmarked: false,
    };
    mutation.mutate(todo);
    console.log(todoText);
    setTodo("");
  }
}

export default TodoList;
