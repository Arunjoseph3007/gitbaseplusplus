import AdminLayout from "@/layouts/AdminLayout";
import axios from "@/libs/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Adduser() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //$ Change handler
  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addUser = async (e) => {
    try {
      if (
        !userDetails.firstName ||
        !userDetails.lastName ||
        !userDetails.email ||
        !userDetails.userName
      ) {
        toast.error("Enter valid user details");
        return;
      }

      if (
        !userDetails.password ||
        userDetails.password != userDetails.confirmPassword
      ) {
        toast.error("Password mismatch");
        return;
      }
      let isAdmin = document.getElementById("admin").checked || false;
      const res = await axios.post("/accounts/register", {
        username: userDetails.userName,
        email: userDetails.email,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        password: userDetails.password,
        is_creator: isAdmin,
      });

      toast.success("User added successfully");

      setUserDetails({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Couldnt add user");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2 ">Add Users</h1>
      <hr />
      <form className="p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">First name</span>
              </label>
              <label className="input-group w-full">
                <input
                  type="text"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={handleChange}
                  placeholder="firstname"
                  className="input input-bordered flex-1"
                />
              </label>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Last name</span>
              </label>
              <label className="input-group w-full">
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleChange}
                  placeholder="lastname"
                  className="input input-bordered flex-1"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">User Name</span>
              </label>
              <label className="input-group w-full">
                <input
                  type="text"
                  name="userName"
                  value={userDetails.userName}
                  onChange={handleChange}
                  placeholder="username"
                  className="input input-bordered flex-1"
                />
              </label>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <label className="input-group w-full">
                <input
                  type="text"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered flex-1"
                />
              </label>
            </div>
          </div>

          {/* //@ Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={userDetails.password}
              className="input input-bordered invalid:border-error"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,264}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </div>

          {/* //@ Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
              name="confirmPassword"
              value={userDetails.confirmPassword}
              className="input input-bordered invalid:border-error"
            />
          </div>

          {/* //@ Make Admin */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-10">
              <span className="label-text font-semibold ">Make Admin</span>
              <div className="flex justify-start gap-10 mb-0 pb-0">
                Yes
                <input
                  type="radio"
                  name="radio-1"
                  id="admin"
                  className="radio"
                />
                No
                <input
                  type="radio"
                  name="radio-1"
                  id="notAdmin"
                  className="radio"
                  checked
                />
              </div>
            </label>
          </div>

          <div className="form-control mt-5">
            <label htmlFor="my-alert" className=" flex-1 btn">
              Add User
            </label>
          </div>
          <input type="checkbox" id="my-alert" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Adding User</h3>
              <p className="py-4">Are you sure, you want to add this user?</p>
              <div className="flex justify-center gap-12">
                <div className="modal-action flex justify-center">
                  <label
                    htmlFor="my-alert"
                    className="btn btn-primary w-[8rem] "
                    onClick={addUser}
                  >
                    Yes
                  </label>
                </div>
                <div className="modal-action flex justify-center">
                  <label
                    htmlFor="my-alert"
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
      </form>
    </div>
  );
}
Adduser.getLayout = AdminLayout;
