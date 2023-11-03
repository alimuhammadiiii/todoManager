import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { List } from "../pages/Home";
type NameList = {
  title: string;
};

export const useAddList = (onSuccess?: (title: NameList) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (title: NameList) => {
      return (await axios.post("/api/list", title, { withCredentials: true }))
        .data as Promise<NameList>;
    },

    onSuccess: (title: NameList) => {
      queryClient.setQueryData(["lists"], (oldData: Array<List> | undefined) => [
        title,
        ...(oldData ?? []),
      ]);
      onSuccess?.(title);
    },
  });
  return mutation;
};
