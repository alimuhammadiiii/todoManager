import { useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { TodoType } from "../components/TodoList";
import { useProfileData } from "../hooks/useProfileData";
import { useDeleteList } from "../hooks/useDeleteList";
import { useAddList } from "../hooks/useAddList";
import { useListsData } from "../hooks/useListsData";
import { useLogOut } from "../hooks/useLogOut";
export type List = {
  id: string;
  title: string;
  createdAt: string;
  modifiedAt: string;
  todos: Array<TodoType>;
};

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [listText, setListText] = useState<string>("");
  const profileData = useProfileData();
  const listsData = useListsData();
  const DeleteList = useDeleteList();
  const logOut = useLogOut();
  const addListMutation = useAddList(function onSuccess() {
    setListText("");
  });

  if (profileData.status === "error") {
    console.log(profileData.error);
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <section className="w-screen h-screen flex  ">
      <div className=" h-screen w-full max-w-xs relative p-5">
        {profileData.status === "pending" ? (
          <h2>Loading...</h2>
        ) : (
          <h2>{profileData.data.username}</h2>
        )}
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
              {listsData.data?.map((list) => {
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
        <button
          onClick={handleShowModal}
          className="absolute bottom-20 btn btn-neutral normal-case"
        >
          New list
        </button>

        <button
          onClick={() => {
            logOut.mutate();
          }}
          className="flex gap-3  absolute bottom-3"
        >
          Log Out
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhklEQVR4nO3VMQ7CMAxA0e6chXtQLkEnroXEpdjJHRj7UCpVYgiiCQmqgD95iP1lW1a67uvAHkE+Af0SQUnxmesSwURB5xN/wVNwajIiDKm4piByxiYnIVcQuWD7lsBrbjiuV5Ci6ohSfGLJw0N8qC5ofmgzGH9HEDT+cPr4sKQ4drmdr587VCZI8cn1PWcAAAAASUVORK5CYII="></img>
        </button>
      </div>

      <div className="w-full p-8 bg-[url('https://images.unsplash.com/photo-1509647648544-a3e09b751ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1604&q=80')] bg-no-repeat bg-center bg-cover ">
        <Outlet />
      </div>
    </section>
  );

  function handleAddNewList() {
    addListMutation.mutate({ title: listText });
  }

  function handleShowModal() {
    setShowModal(!showModal);
  }

  function handleDeleteList(id: string) {
    DeleteList.mutate(id);
  }
}

export default Home;
