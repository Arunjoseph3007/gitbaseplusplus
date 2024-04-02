import { useUser } from "@/context/userContext";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateRepoPage() {
  const [repoName, setRepoName] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  //@ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/repository/userRepos`, {
        repo_name: repoName,
        repo_description: repoDesc,
        project_name: router.query.userName
      });

      toast.success("Repo created sucessfully");
      router.push(`/${router.query.userName}/${res.data.repo_name}`);
    } catch (error) {
      setError(error);
      toast.error("Something went wrong");
    }
  };

  //@ Handle change
  const handleChange = (e) => {
    setRepoName(e.target.value);

    setError(!e.target.validity.valid);
  };

  //$ UI
  return (
    <div className="w-full max-w-[800px] mx-auto mt-[5rem]">
      <h1 className="text-3xl my-2">Create a Repository</h1>
      <p>
        A repository contains all project files, including the revision history.
      </p>
      <hr className="my-2" />

      {/* //? Form */}
      <form onSubmit={handleSubmit} className="form-control ">
        <div className="flex gap-2 items-end">
          <div>
            <label className="label">Project name</label>
            <input
              value={router.query.userName}
              onChange={handleChange}
              readOnly
              type="text"
              className="input input-secondary input-bordered invalid:input-error"
              required
            />
          </div>
          <span className="text-4xl font-bold text-gray-400 mb-1">/</span>
          <div className="flex-1">
            <label htmlFor="repo-name-input" className="label">
              Repository name
            </label>
            <input
              value={repoName}
              onChange={handleChange}
              id="repo-name-input"
              type="text"
              pattern="[a-zA-Z0-9_]{4,32}"
              title="A string consisting alphabets, numbers and characters - or _ with length not more than 32 characters and not less than 4 characters"
              className="input input-secondary input-bordered invalid:input-error w-full"
              required
            />
          </div>
        </div>

        <label htmlFor="desc-input" className="label">
          Description
        </label>
        <input
          value={repoDesc}
          onChange={(e) => setRepoDesc(e.target.value)}
          id="desc-input"
          type="text"
          className="input input-bordered"
        />
        <button className="btn mt-10" type="submit">
          Create Repository
        </button>
      </form>
    </div>
  );
}
