import AdminHeader from "@/components/AdminHeader";
import React from "react";
import Link from "next/link";

export default function admin() {
  return (
    <div>
      <AdminHeader/>
      <div className="flex justify-evenly ">
      <Link href={"/admin/projects"}>
        <div className="w-[15rem] h-[18rem] my-5 rounded-lg shadow-xl bg-slate-200 flex flex-col flex-col-1  items-center  justify-center hover:scale-105 hover:cursor-pointer">
          
            <div className="avatar  ">
              <div className="w-24  mask mask-squircle ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
          </div>
          <div className="text-4xl font-extrabold">
                Projects
          </div>
        </div>
        </Link>
        <Link href={"/admin/users"}>
        <div className="w-[15rem] h-[18rem] my-5 rounded-lg shadow-xl bg-slate-200 flex flex-col flex-col-1  items-center  justify-center hover:scale-105 hover:cursor-pointer">
          <div className="">
            <div className="avatar ">
              <div className="w-24  mask mask-squircle ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-4xl font-extrabold">
                Users
          </div>
        </div>
        </Link>
        <Link href={"/admin/adduser"}>
        <div className="w-[15rem] h-[18rem] my-5 rounded-lg shadow-xl bg-slate-200 flex flex-col flex-col-1  items-center  justify-center hover:scale-105 hover:cursor-pointer">
          <div className="">
            <div className="avatar ">
              <div className="w-24  mask mask-squircle ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-4xl font-extrabold">
                Add User
          </div>
        </div>
      </Link>
      </div>
    </div>
  );
}
