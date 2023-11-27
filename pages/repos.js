import { CollaboratorsIcon } from "@/icons/collaborators";
import UserLayout from "@/layouts/UserLayout";
import { format } from "timeago.js";

const repos = new Array(7).fill(0).map((_, i) => ({
  id: i,
  project: "Project00",
  name: "Repo " + i,
  createdAt: new Date().toDateString(),
  description: "Repo description goes here Repo description goes here. Repo description goes here Repo description goes here.",
  image: "https://picsum.photos/200",
  noOfUsers: 16,
}));

export default function ReposPage() {
  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2">Repos</h1>
      <hr />
      <div>
        {repos.map((repo) => (
          <div
            className="flex justify-between gap-3 p-3 my-3 mt-5 border shadow rounded-md"
            key={repo.id}
          >
            <img
              src={repo.image}
              alt={repo.name}
              className="h-[80px] aspect-square rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium underline">
                  {repo.project}/{repo.name}
                </h3>
                <div className="w-[6px] aspect-square rounded-full bg-gray-300"></div>
                <p className="text-gray-400 text-sm">
                  created {format(repo.createdAt)}
                </p>
              </div>
              <p className="max-w-[650px] text-gray-600 font-light text-sm">
                {repo.description}
              </p>
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
