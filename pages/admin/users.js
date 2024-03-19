import { Chevron } from "@/icons/chevron";
import { Details } from "@/icons/details";
import { Email } from "@/icons/email";
import { UserName } from "@/icons/username";
import Link from "next/link";
import AdminLayout from "@/layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "timeago.js";
import Dustbin from "@/icons/dustbin";

export default function Users() {
  const [userMode, setUserMode] = useState("All Users");
  const [userDetails, setUserDetails] = useState([]);
  const [allUserDetails, setAllUserDetails] = useState([]);
  useEffect(() => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    if (userMode == "Managers") {
      Managers();
    } else if (userMode == "Admins") {
      Admins();
    } else {
      AllUsers();
    }
  }, [userMode]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const convertToUserFormat = (allUsers) => {
    const users = allUsers.map((user) => ({
      id: user.username,
      firstName: user.first_name,
      secondName: user.last_name,
      email: user.email,
      userName: user.username,
      image: "https://gitbase.pythonanywhere.com" + user.profile_pic,
      isManager: user.is_manager,
      isAdmin: user.is_creator,
      currentproject: "adminpannel",
      noOfYears: user.date_joined,
    }));
    return users;
  };



  async function fetchUsers() {
    try {
      let config = {
        headers: {
          Authorization: "Token fe79b187e8f57e6f5ee9afefdd14388ae972ee0f",
        },
      };
      const allUsers = await axios.get(
        "https://gitbase.pythonanywhere.com" + "/accounts/register",
        config
      );
      setUserDetails(convertToUserFormat(allUsers.data));
      setAllUserDetails(convertToUserFormat(allUsers.data));
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  }
  async function removeUsers(userName) {
    try {
      let config = {
        headers: {
          Authorization: "Token fe79b187e8f57e6f5ee9afefdd14388ae972ee0f",
        },
        params:{
          username: userName,
        }
      };
      const allUsers = await axios.delete(
        "https://gitbase.pythonanywhere.com" + "/accounts/register",
        config
      );
      fetchUsers()
      toast.success("User has been Removed!");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  }
  const AllUsers = () => {
    setUserDetails(allUserDetails);
  };
  const Managers = () => {
    setUserDetails(
      allUserDetails.filter((user) => {
        return user.isManager;
      })
    );
  };
  const Admins = () => {
    setUserDetails(
      allUserDetails.filter((user) => {
        return user.isAdmin;
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between mt-2 px-4 py-2">
        <h1 className="text-4xl font-medium  ">Users</h1>

        <div className="dropdown dropdown-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 dropdown dropdown-end "
            role="button"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <button onClick={() => setUserMode("All Users")}>
                All Users
              </button>
            </li>
            <li>
              <button onClick={() => setUserMode("Managers")}>
                Managers Only
              </button>
            </li>
            <li>
              <button onClick={() => setUserMode("Admins")}>Admin Only</button>
            </li>
          </ul>
        </div>
      </div>

      <hr />
      <div className="font-semibold flex items-center justify-center text-2xl mt-3 underline">
        {" "}
        {userMode}
      </div>

      <div>
        {userDetails.map((user) => (
          <div className="flex justify-center" key={user.userName}>
            <div
              className="flex items-center justify-between w-[80%] gap-3 p-3 my-3 mt-5 border shadow rounded-full"
            >
              <div className="w-[10%]">
                <Link href="/admin">
                  <img
                    src={user.image}
                    alt={user.userName}
                    className="h-[80px] aspect-square rounded-full object-cover hover:cursor-pointer"
                  />
                </Link>
              </div>
              <div className="flex-1 flex justify-between w-[30%]">
                <div className="flex flex-col gap-1 ml-5">
                  <Link href="/admin">
                    <div className="flex gap-2 items-center hover:cursor-pointer">
                      <Details />
                      <h6 className="text-lg font-medium">{user.firstName}</h6>
                      <h6 className="text-lg font-medium">{user.secondName}</h6>
                    </div>
                  </Link>
                  <div className="flex gap-2 ">
                    <UserName />
                    {user.userName}
                  </div>
                  <div className="flex gap-2">
                    <Email />
                    {user.email}
                  </div>
                </div>

                <div className="flex w-[40%] justify-start">
                  <div className="flex flex-col   justify-evenly ">
                    <div className="flex gap-2 items-center justify-start">
                      <div className=" badge badge-primary ">
                        CurrentProject
                      </div>
                      <div>{user.currentproject}</div>
                    </div>
                    <div>
                      <div className="flex gap-2 items-center justify-start">
                        <div className=" badge  ">Experience</div>
                        <div>{format(user.noOfYears)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[5%]  form-control">
                <label htmlFor={`remove-${user.userName}`} className=" flex-1 hover:cursor-pointer">
                  <Dustbin />
                </label>
              </div>
              <input type="checkbox"  id={`remove-${user.userName}`} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Remove User</h3>
                  <p className="py-4">
                    Are you sure, you want to remove this user?
                  </p>
                  <div className="flex justify-center gap-12">
                    <div className="modal-action flex justify-center">
                      <label
                        htmlFor={`remove-${user.userName}`}
                        className="btn btn-primary w-[8rem] "
                        onClick={()=>{removeUsers(user.userName);}}
                      >
                        Yes
                      </label>
                    </div>
                    <div className="modal-action flex justify-center">
                      <label
                        htmlFor={`remove-${user.userName}`}
                        className="btn btn-secondary w-[8rem]  "
                        onClick={() => {}}
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Users.getLayout = AdminLayout;
