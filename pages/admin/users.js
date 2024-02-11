import { Chevron } from "@/icons/chevron";
import { Details } from "@/icons/details";
import { Email } from "@/icons/email";
import { UserName } from "@/icons/username";
import Link from "next/link";
import AdminLayout from "@/layouts/AdminLayout";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [userMode,setUserMode] = useState("All Users")
  const [userDetails,setUserDetails] = useState([])
  
  const AllUsers = () =>{
    const users = new Array(7).fill(0).map((_, i) => ({
      id: i,
      firstName: "FirstName" + (i + 1),
      secondName: "SecondName" + (i + 1),
      email: "email_123@gmail.com",
      userName: "myUserName",
      image: "https://picsum.photos/200",
      currentproject: "adminpannel",
      noOfYears: "3+",
    }));
    setUserDetails(users)
  }
  const Managers = () =>{
    const users = new Array(5).fill(0).map((_, i) => ({
      id: i,
      firstName: "FirstName" + (i + 1),
      secondName: "SecondName" + (i + 1),
      email: "email_123@gmail.com",
      userName: "myUserName",
      image: "https://picsum.photos/200",
      currentproject: "adminpannel",
      noOfYears: "3+",
    }));
    setUserDetails(users)
  }
  const Admins = () =>{
    const users = new Array(2).fill(0).map((_, i) => ({
      id: i,
      firstName: "FirstName" + (i + 1),
      secondName: "SecondName" + (i + 1),
      email: "email_123@gmail.com",
      userName: "myUserName",
      image: "https://picsum.photos/200",
      currentproject: "adminpannel",
      noOfYears: "3+",
    }));
    setUserDetails(users);
  }
  useEffect(()=>{
      if(userMode == "Managers"){
        Managers();
      }
      else if(userMode == "Admins"){
        Admins();
      }
      else{
        AllUsers();
      }
  },[userMode]);

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
              <button onClick={()=>setUserMode("All Users")}>All Users</button>
            </li>
            <li>
              <button onClick={()=>setUserMode("Managers")}>Managers Only</button>
            </li>
            <li>
              <button onClick={()=>setUserMode("Admins")}>Admin Only</button>
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
          <div className="flex justify-center">
            <div
              className="flex items-center justify-between w-[80%] gap-3 p-3 my-3 mt-5 border shadow rounded-full"
              key={user.id}
            >
              <div className="w-[10%]">
                <img
                  src={user.image}
                  alt={user.userName}
                  className="h-[80px] aspect-square rounded-full object-cover"
                />
              </div>
              <div className="flex-1 flex justify-evenly w-[30%]">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Details />
                    <h6 className="text-lg font-medium">{user.firstName}</h6>
                    <h6 className="text-lg font-medium">{user.secondName}</h6>
                  </div>
                  <div className="flex gap-2">
                    <UserName />
                    {user.userName}
                  </div>
                  <div className="flex gap-2">
                    <Email />
                    {user.email}
                  </div>
                </div>

                <div className="flex w-[40%]">
                  <div className="flex flex-col   justify-evenly ">
                    <div className="flex gap-2 items-center justify-start">
                      <div className=" badge badge-primary ">CurrentProject</div>
                      <div>{user.currentproject}</div>
                    </div>
                    <div>
                    <div className="flex gap-2 items-center justify-start">
                      <div className=" badge  ">Experience</div>
                      <div>{user.noOfYears} yrs</div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/admin">
                <div className="w-[5%] hover:cursor-pointer">
                  <Chevron />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Users.getLayout = AdminLayout;
