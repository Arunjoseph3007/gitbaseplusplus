import { useUser } from "@/context/userContext";
import { EditIcon } from "@/icons/edit";
import { PlusIcon } from "@/icons/plus";
import UserLayout from "@/layouts/UserLayout";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [details, setDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio,
    dob: user?.dob,
  });
  const [imgFile, setImgFile] = useState(null);

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patchForm(
        `/accounts/MyUser/${localStorage.getItem("id")}/`,
        {
          first_name: details.firstName,
          last_name: details.lastName,
          profile_pic: imgFile,
          bio: details.bio,
          dob: details.dob,
        }
      );

      setUser({
        ...user,
        ...details,
        photoUrl: process.env.NEXT_PUBLIC_API + res.data.profile_pic,
      });
      setImgFile(null);
      toast.success("Updated successfully");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    user && setDetails(user);
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2">Profile</h1>
      <hr />

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-start gap-4">
          <div>
            <div className="relative">
              <img
                className="w-52 aspect-square rounded-full object-cover"
                src={imgFile ? URL.createObjectURL(imgFile) : user?.photoUrl}
              />
              {imgFile ? (
                <button
                  onClick={() => setImgFile(null)}
                  className="btn rounded-full absolute bottom-0 right-0 p-2 aspect-square cursor-pointer rotate-45"
                >
                  <PlusIcon />
                </button>
              ) : (
                <label
                  htmlFor="imgInput"
                  className="btn rounded-full absolute bottom-0 right-0 p-2 aspect-square cursor-pointer"
                >
                  <EditIcon />
                </label>
              )}
              <input
                onInput={(e) => setImgFile(e.target.files[0])}
                type="file"
                className="hidden"
                id="imgInput"
              />
            </div>

            <div className="flex items-center flex-col mt-4">
              <h2 className="font-bold text-xl">
                {user?.firstName} {user?.lastName}
              </h2>
              <h2>{user?.userName}</h2>
            </div>
          </div>

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
                    value={details.firstName}
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
                    value={details.lastName}
                    onChange={handleChange}
                    placeholder="Eg. Doe"
                    className="input input-bordered flex-1"
                  />
                </label>
              </div>
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text font-semibold">Bio </span>
                <span className="text-gray-400 text-sm">
                  ({details.bio?.length || 0}/250)
                </span>
              </label>
              <label className="input-group w-full">
                <textarea
                  name="bio"
                  rows={5}
                  maxLength={250}
                  value={details.bio}
                  onChange={handleChange}
                  placeholder="Your bio goes here"
                  className="textarea textarea-bordered flex-1"
                />
              </label>
            </div>

            <div className="flex-1 flex items-end gap-2">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-semibold">
                    Date of Birth
                  </span>
                </label>
                <label className="input-group w-full">
                  <input
                    type="date"
                    name="dob"
                    value={details.dob}
                    onChange={handleChange}
                    className="input input-bordered flex-1"
                  />
                </label>
              </div>

              <button type="submit" className="btn flex-1">
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

ProfilePage.getLayout = UserLayout;
