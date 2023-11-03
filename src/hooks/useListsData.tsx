import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { List } from "../pages/Home";

async function fetchLists() {
  return (await axios.get("/api/lists", { withCredentials: true })).data as Promise<Array<List>>;
}

export const useListsData = () => {
  const listQuery = useQuery({
    queryKey: ["lists"],
    queryFn: fetchLists,
    placeholderData: keepPreviousData,
  });
  return listQuery;
};
