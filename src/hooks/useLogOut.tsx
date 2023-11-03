import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logOut = useMutation({
    mutationFn: async () => {
      return await axios.post("/api/sign-out");
    },

    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("LogOut success");
      navigate("/login");
    },
  });
  return logOut;
};
