import axios from "axios";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TodoType } from "../components/TodoList";
export const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (todo: TodoType) => {
      const todoReq = { ...todo, createdAt: undefined, modifiedAt: undefined };
      return (await axios.post("/api/todo", todoReq, { withCredentials: true }))
        .data as Promise<TodoType>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError(error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log(error);
          navigate("/login");
        }
      }
    },
  });

  return mutation;
};
