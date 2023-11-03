import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { List } from "../pages/Home";

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  const deleteList = useMutation({
    mutationFn: async (id: string) => {
      console.log(id);
      await axios.delete(`/api/list/${id}`, { withCredentials: true });
      return id;
    },
    onSuccess: (id: string) => {
      queryClient.setQueryData(["lists"], (oldData: Array<List> | undefined) => {
        const filterData = oldData?.filter((list) => list.id !== id);
        return filterData;
      });
    },
  });

  return deleteList;
};
