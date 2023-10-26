import TodoList from "../components/TodoList";
import { useDataUser } from "../components/useUserInfo";

function Home() {
  const userData = useDataUser();
  return (
    <section className="w-screen h-screen flex">
      <div className="bg-slate-100 h-screen w-80">
        <div>welcome *_*{userData}</div>
      </div>
      <div className="w-full">
        <TodoList />
      </div>
    </section>
  );
}

export default Home;
