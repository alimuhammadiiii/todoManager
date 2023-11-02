import { TodoType } from "../components/TodoList";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (todo: TodoType) => {
      const todoReq = { ...todo, createdAt: undefined, modifiedAt: undefined };
      return (await axios.patch("/api/todo", todoReq, { withCredentials: true }))
        .data as Promise<TodoType>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
  return mutation;
};
