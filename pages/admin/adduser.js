import AdminLayout from '@/layouts/AdminLayout'
import React, { useState } from 'react'

export default function Adduser() {
  const [userDetails, setUserDetails] = useState({
    firstName: "Bhavik",
    lastName: "Shah",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //$ Change handler
  const handleChange = (e) =>
  setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2 ">Add Users</h1>
      <hr />
      <form  className="p-4">
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
                    placeholder="Eg. John"
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
                    placeholder="Eg. Doe"
                    className="input input-bordered flex-1"
                  />
                </label>
              </div>
            </div>
            </div>
      </form>
    </div>
  )
}
Adduser.getLayout = AdminLayout
