import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TodoType } from "../components/TodoList";
type NameList = {
  title: string;
};

export type List = {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  todos: Array<TodoType>;
};

async function fetchLists() {
  return (await axios.get("/api/lists", { withCredentials: true })).data as Promise<Array<List>>;
}

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [listText, setListText] = useState<string>("");
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
      setListText("");
    },
  });
  const listQuery = useQuery({ queryKey: ["lists"], queryFn: fetchLists });
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

  if (mutation.isPending) {
    return <h2>loading</h2>;
  }
  if (mutation.isError) {
    return <div>An error occurred: {mutation.error.message}</div>;
  }

  return (
    <section className="w-screen h-screen flex  ">
      <div className=" h-screen w-full max-w-xs relative p-5">
        <ul className="flex flex-col gap-2">
          <div className="collapse bg-base-200">
            <input
              type="radio"
              name="my-accordion-1"
              onClick={() => setShowList(!showList)}
              checked={true}
              onChange={() => {}}
            />
            <div className="collapse-title text-xl font-medium">Lists {showList ? "-" : "+"}</div>

            <div className="collapse-content flex flex-col gap-2 ">
              {listQuery.data?.map((list) => {
                return (
                  <li key={list.id} className="flex gap-2 items-center w-full justify-between">
                    <Link to={`/home/lists/${list.id}`}>{list.title}</Link>
                    <div className="flex gap-2">
                      <button className="btn btn-success">edit</button>
                      <button onClick={() => handleDeleteList(list.id)} className="btn btn-error">
                        delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </div>
          </div>
          <Link to="/home/improve-todo">improve</Link>
        </ul>
        {showModal && (
          <div className="absolute bottom-20">
            <input type="text" value={listText} onChange={(e) => setListText(e.target.value)} />
            <button onClick={handleAddNewList} className="">
              Add
            </button>
          </div>
        )}
        <button onClick={handleShowModal} className="absolute bottom-3 btn btn-neutral normal-case">
          New list
        </button>
      </div>

      <div className="w-full p-8 bg-[url('https://images.unsplash.com/photo-1509647648544-a3e09b751ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1604&q=80')] bg-no-repeat bg-center bg-cover ">
        <Outlet />
      </div>
    </section>
  );

  function handleAddNewList() {
    mutation.mutate({ title: listText });
  }

  function handleShowModal() {
    setShowModal(!showModal);
  }

  function handleDeleteList(id: string) {
    console.log(id);
    deleteList.mutate(id);
  }
}

export default Home;
