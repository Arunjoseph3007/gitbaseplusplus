import { BranchIcon } from "@/icons/branch";
import { UserIcon } from "@/icons/user";
import { useRouter } from "next/router";
import { useState } from "react";
import { format } from "timeago.js";
import { CollaboratorsIcon } from "@/icons/collaborators";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

export default function ProjectPage() {
  const router = useRouter();
  const [tab, setTab] = useState("user");
  const [projectDetails, setProjectDetails] = useState({
    projectName: router.query.projectName,
    createdAt: new Date().toDateString(),
    noOfRepos: 12,
    noOfUsers: 16,
    description:
      "A very very long description. A very very long description. A very very long description. A very very long description. ",
    admin: {
      userId: 12,
      photoUrl: "https://picsum.photos/200",
      userName: "Admin 2",
    },
  });
  const [users, setUser] = useState(
    new Array(7).fill(0).map((_, i) => ({
      id: i,
      firstName: "First" + (i + 1),
      secondName: "Second" + (i + 1),
      email: "email_123@gmail.com",
      userName: "myUserName",
      image: "https://picsum.photos/200?random=" + i,
      isManager: Math.random() > 0.5,
    }))
  );
  const [repos, setRepos] = useState(
    new Array(7).fill(0).map((_, i) => ({
      id: i,
      project: "Project00",
      name: "Repo " + i,
      createdAt: new Date().toDateString(),
      description:
        "Repo description goes here Repo description goes here. Repo description goes here Repo description goes here.",
      noOfUsers: 16,
      createdBy: {
        userId: i + 12,
        photoUrl: "https://picsum.photos/200?random=" + i,
        userName: "Manager" + (i + 12).toString(),
      },
    }))
  );

  return (
    <main className="flex justify-center">
      <div className="max-w-[1000px] w-[95%]">
        {/* Header */}
        <div className=" mt-12 p-5 shadow-lg rounded-xl border">
          <div className="flex gap-3">
            <div className="w-[350px]">
              <h2 className="text-5xl font-bold">{router.query.projectName}</h2>
              <p className="text-gray-400 text-sm">
                created {format(projectDetails.createdAt)}
              </p>
            </div>

            <div className="w-[200px]">
              <div className="flex items-center gap-3">
                <span className="scale-[1.4] ml-2">
                  <BranchIcon />
                </span>
                <p className="font-bold text-4xl">{projectDetails.noOfRepos}</p>
              </div>
              <p className="text-gray-400 text-sm">
                contains {projectDetails.noOfUsers} repos
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="scale-[1.4] ml-2">
                  <UserIcon />
                </span>
                <p className="font-bold text-4xl">{projectDetails.noOfUsers}</p>
              </div>
              <p className="text-gray-400 text-sm">
                has {projectDetails.noOfUsers} users
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start mt-8">
            <div className="flex gap-3 items-center min-w-[350px]">
              <img
                src={projectDetails.admin.photoUrl}
                alt={projectDetails.admin.userName}
                className="w-10 aspect-square rounded-full object-contain"
              />
              <div>
                <p className="text-gray-400 text-sm">Created by</p>
                <p className="font-semibold text-lg">
                  {projectDetails.admin.userName}
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">Description</p>
              <p className="text-gray-400 text-sm">
                {projectDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="tabs mt-12">
          <button
            onClick={() => setTab("user")}
            role="tab"
            className={`text-lg font-semibold tab  tab-bordered ${
              tab == "user" && "tab-active"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("repo")}
            role="tab"
            className={`text-lg font-semibold tab tab-bordered ${
              tab == "repo" && "tab-active"
            }`}
          >
            Repositories
          </button>
        </div>

        {/* User tab */}
        {tab == "user" && (
          <div>
            {users.map((user) => (
              <div
                className="border m-2 p-2 rounded-md flex gap-8"
                key={user.id}
              >
                <img
                  src={user.image}
                  alt={user.userName}
                  className="w-24 aspect-sqaure rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">
                      {user.firstName} {user.secondName}
                    </p>
                    <div className="w-2 h-2 bg-gray-200 rounded-full" />
                    <p className="text-gray-400 text-sm">{user.userName}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-gray-500 text-sm w-[60px]">Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-gray-500 text-sm w-[60px]">Role</p>
                    <p>{user.isManager ? "Manager" : "Developer"}</p>
                  </div>
                </div>

                <Link href={`/${user.userName}`}>
                  <a className="self-end text-sm underline">Go to profile</a>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Repos tab */}
        {tab == "repo" && (
          <div>
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
                      className="w-5 aspect-square object-contain rounded-full"
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
        )}
      </div>
    </main>
  );
}

ProjectPage.getLayout = MainLayout;
