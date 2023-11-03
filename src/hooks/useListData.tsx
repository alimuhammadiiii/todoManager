import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type List = {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  todos: Array<Todo>;
};

type Todo = {
  id: string;
  listId: string;
  content: string;
  completed: boolean;
  bookmarked: boolean;
  createdAt: string;
  modifiedAt: string;
};

async function fetchListId(listId: string | undefined) {
  return (await axios.get(`/api/list/${listId}`, { withCredentials: true })).data as Promise<List>;
}
export const useListData = (listId: string | undefined) => {
  return useQuery({ queryKey: ["lists", listId], queryFn: () => fetchListId(listId) });
};
