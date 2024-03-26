import useDebounceEffect from "@/hooks/useDebounceEffect";
import { PlusIcon } from "@/icons/plus";
import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const KEY = "add-user-modal";

export default function AddUserToProjectModal({ refetchProjectAccess }) {
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [userRes, setUserRes] = useState(
    new Array(7).fill(0).map((_, i) => ({
      id: i,
      firstName: "First" + (i + 1),
      secondName: "Second" + (i + 1),
      email: "email_123@gmail.com",
      userName: "myUserName",
      image: "https://picsum.photos/200?random=" + i,
    }))
  );

  const close = () => setShow(false);

  const addMember = async (isManager) => {
    try {
      const res = await axios.post("/project/adminProjectAccess", {
        project_name: query.projectName,
        user_id: selected.id,
        is_manager: isManager,
      });

      toast.success("Access granted");
      await refetchProjectAccess();
    } catch (error) {
      toast.error("Something went wrong");
    }

    close();
  };

  useDebounceEffect(async () => {
    if (!search) {
      setUserRes([]);
      return;
    }

    const res = await axios.get("/accounts/userSearch", {
      params: { keyword: search },
    });

    setUserRes(
      res.data.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        secondName: user.last_name,
        email: user.email,
        userName: user.username,
        image: "https://gitbase.pythonanywhere.com" + user.profile_pic,
      }))
    );
  }, [search]);

  return (
    <>
      <label
        htmlFor={KEY}
        onClick={() => setShow(true)}
        className="btn gap-3 rounded-full"
      >
        <PlusIcon />
        Add user
      </label>

      <input
        id={KEY}
        className="modal-toggle block appearance-auto"
        type="checkbox"
        checked={show}
      />
      <label htmlFor={KEY} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor={KEY}
            onClick={close}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add User</h3>
          <p className="py-4">Enter user you want to add to this project</p>
          <input
            className="input input-bordered rounded-full w-full"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="min-h-[100px] max-h-[250px] overflow-scroll my-2">
            {!selected ? (
              userRes.map((user) => (
                <div
                  onClick={(e) => {
                    setSelected(user);
                  }}
                  className="border m-2 p-2 rounded-md flex gap-4 items-center cursor-pointer"
                  key={user.id}
                >
                  <img
                    src={user.image}
                    alt={user.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {user.firstName} {user.secondName}
                      </h3>
                      <div className="w-1 h-1 bg-gray-200 rounded-full" />
                      <p className="text-gray-400 text-sm">{user.userName}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="border m-2 p-2 rounded-md flex gap-4 items-center cursor-pointer">
                <img
                  src={selected.image}
                  alt={selected.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {selected.firstName} {selected.secondName}
                    </h3>
                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                    <p className="text-gray-400 text-sm">{selected.userName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p>{selected.email}</p>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-circle"
                  onClick={(e) => {
                    setSelected(null);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end w-full mt-4">
            <button
              onClick={() => addMember(false)}
              disabled={!selected}
              className="btn"
            >
              Add as Developer
            </button>
            <button
              onClick={() => addMember(true)}
              disabled={!selected}
              className="btn btn-success"
            >
              Add as Manager
            </button>
          </div>
        </label>
      </label>
    </>
  );
}
