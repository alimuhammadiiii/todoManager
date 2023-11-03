import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProfile() {
  return (await axios.get("/api/profile", { withCredentials: true })).data as Promise<{
    username: string;
  }>;
}

export const useProfileData = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
  });
};
