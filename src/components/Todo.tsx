import { useState } from "react";
import { TodoType } from "./TodoList";
import { useEditMutation } from "../hooks/useEditTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

type TodoProps = {
  onDelete?: () => void;
  onEdit?: (text: string) => void;
  onComplete?: () => void;
  todo: TodoType;
};

function Todo({ todo }: TodoProps) {
  const [text, setText] = useState(todo.content);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editTodo = useEditMutation();
  const deleteTodo = useDeleteTodo();
  return (
    <li className="list-none w-full flex items-center gap-2 relative">
      <div className="relative flex-grow ">
        <input
          type="checkbox"
          className="checkbox checkbox-success absolute left-2 top-3 z-10"
          onChange={handleComplete}
          checked={todo.completed}
        />
        <input
          className={`flex-grow h-12 pl-12 rounded-md w-full backdrop-blur-xl bg-white/10 outline-none text-[#d1d1d1] ${
            todo.completed && "line-through"
          }`}
          type="text"
          value={text}
          disabled={!isEditable}
          onChange={(e) => {
            const value = e.target.value;
            // onEdit(value);
            setText(value);
          }}
        />
      </div>
      <button onClick={handleEdit} className=" bg-[#1FB2A6] text-white px-4 h-12 rounded-lg">
        {isEditable ? "Save" : "Edit"}
      </button>
      <button onClick={handleDelete} className="btn btn-error">
        Delete
      </button>
    </li>
  );

  function handleEdit() {
    setIsEditable(!isEditable);
    editTodo.mutate({ ...todo, content: text });
  }

  function handleDelete() {
    if (!todo.id) return;
    deleteTodo.mutate(todo.id);
  }

  function handleComplete() {
    editTodo.mutate({ ...todo, completed: !todo.completed });
  }
}

export default Todo;
