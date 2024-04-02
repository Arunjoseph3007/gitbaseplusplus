import React from "react";
import EditProfileModal from "./EditProfileModal";
import { useUser } from "@/context/userContext";

export default function AdminHeader() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center mt-10 ">
      <div className="flex flex-col items-center w-[100%]">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="/logo4.png" />
          </div>
        </div>
        <div className="text-2xl font-bold">Gitbase</div>
        {user && (<>
        
        <div className="flex items-center justify-evenly w-[100%] mt-[1%] font-mono font-semibold">
          <div className="w-[20%] flex justify-center">
          {user.firstName}{" "}{user.lastName}
            
            {user && (
              <>
                <div className="">
                  <label htmlFor="my-modal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="ml-2 w-6 h-5 hover:cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </label>
                </div>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                  <EditProfileModal />
                </div>
              </>
            )}
          </div>
          <div className="w-[20%] flex justify-center">{user.userName}</div>
          <div className="w-[20%] flex justify-center">
            {user.email}
          </div>
        </div>
        <div className="divider"></div>
        </>)}
      </div>
    </div>
  );
}
