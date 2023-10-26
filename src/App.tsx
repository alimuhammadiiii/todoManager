import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import NoMatch from "./pages/NoMatch";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./components/useUserInfo";

const queryClient = new QueryClient();
function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <ToastContainer autoClose={5000} />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
