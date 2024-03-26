import { CollaboratorsIcon } from "@/icons/collaborators";
import UserLayout from "@/layouts/UserLayout";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

export default function ReposPage() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await axios.get("/repository/userRepos");

      setRepos(
        res.data.map((repo) => ({
          id: repo.id,
          project: repo.project_id.project_name,
          name: repo.repo_name,
          createdAt: repo.created_at,
          description: repo.repo_description,
          noOfUsers: repo.contributors_count,
          createdBy: {
            userId: repo.created_by.id,
            userName: repo.created_by.username,
            photoUrl:
              "https://gitbase.pythonanywhere.com" +
              repo.created_by.profile_pic,
          },
        }))
      );
    };

    fetchRepos();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2">Repos</h1>
      <hr />
      <div className="mx-4">
        {repos.map((repo) => (
          <div
            className="flex justify-between gap-3 p-3 my-3 mt-5 border shadow rounded-md"
            key={repo.id}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium underline">
                  {repo.project}/{repo.name}
                </h3>
                <div className="w-[6px] aspect-square rounded-full bg-gray-300" />
                <p className="text-gray-400 text-sm">
                  {format(repo.createdAt)}
                </p>
              </div>
              <p className="max-w-[650px] text-gray-600 font-light text-sm">
                {repo.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={repo.createdBy.photoUrl}
                  alt={repo.createdBy.userName}
                  className="w-6 aspect-square object-contain rounded-full"
                />
                <p className="text-gray-400 text-sm">
                  <span className="cursor-pointer hover:underline">
                    {repo.createdBy.userName}
                  </span>{" "}
                  created this repo
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-xs [&_svg]:h-4">
                <CollaboratorsIcon /> <p>{repo.noOfUsers} collaborators</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReposPage.getLayout = UserLayout;
