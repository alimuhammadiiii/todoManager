import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetDataUser } from "../components/useUserInfo";
import { User } from "./SignUp";

function Login() {
  const [loginForm, setLoginForm] = useState<User>({ username: "", password: "" });
  const navigate = useNavigate();
  const username = useSetDataUser();

  const mutation = useMutation({
    mutationFn: async (userInfo: User) => {
      return (await axios.post("http://localhost:3000/sign-in", userInfo)).data as Promise<User>;
    },
    onSuccess() {
      username(loginForm.username);
      setLoginForm({ username: "", password: "" });
      navigate("/home");
      toast.success("Login success");
    },
    onError() {
      toast.error("password or username incorrect");
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
        <p className="text-[#000] text-[35px] font-semibold ">Login</p>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="input input-bordered w-full "
          value={loginForm.username}
          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input input-bordered w-full "
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />

        <button className="btn  w-full" onClick={handleLogin}>
          Login
        </button>
      </form>
    </section>
  );

  function handleLogin() {
    console.log(loginForm);
    mutation.mutate(loginForm);
  }
}

export default Login;
