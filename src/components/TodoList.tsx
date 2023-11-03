import { useState } from "react";
import { useParams } from "react-router-dom";
import Todo from "./Todo";
import { useListData } from "../hooks/useListData";
import { useTodoMutation } from "../hooks/useTodo";

export type TodoType = {
  id: string | undefined;
  listId: string | undefined;
  content: string;
  completed: boolean;
  bookmarked: boolean;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
};

export default function TodoList() {
  const [todoText, setTodo] = useState<string>("");
  const addTodo = useTodoMutation();

  const { listId } = useParams();
  const { isLoading, data, isError, error } = useListData(listId);
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  if (isLoading) {
    return <h2>loading....</h2>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <ul className="flex-1 h-full">
        {data?.todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} />;
        })}
      </ul>

      <div className="mt-7">
        <input value={todoText} onChange={(e) => setTodo(e.target.value)} type="text" />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );

  function handleAddTodo() {
    if (!data) return;

    const todo: TodoType = {
      id: undefined,
      listId: data.id,
      content: todoText,
      completed: false,
      bookmarked: false,
      createdAt: undefined,
      modifiedAt: undefined,
    };
    addTodo.mutate(todo);
    setTodo("");
  }
}
