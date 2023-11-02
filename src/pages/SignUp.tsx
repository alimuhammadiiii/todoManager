import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type User = {
  username: string;
  password: string;
};

export default function SignUp() {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (userInfo: User) => {
      return (await axios.post("api/sign-up", userInfo)).data as Promise<User>;
    },
    onSuccess: () => {
      toast.success("ثبت نام موفقیت امیز بود");
      setUser({ username: "", password: "" });
      navigate("/home");
    },
    onError: () => {
      toast.error("ثبت نام به مشکل خورد");
    },
  });
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        action=""
        className="flex w-full flex-col gap-10 max-w-lg bg-[#fbfbfb] rounded-3xl border border-[#D6D6D6] p-10 m-auto"
      >
        <p className="text-[#000] text-[35px] font-semibold ">Sign Up</p>
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          placeholder="username"
          className="input input-bordered w-full "
        />
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="password"
          className="input input-bordered w-full "
        />

        <button onClick={handleRegister} className="btn btn-block  text-white">
          Register
        </button>
      </form>
    </section>
  );

  function handleRegister() {
    mutation.mutate(user);
  }
}
