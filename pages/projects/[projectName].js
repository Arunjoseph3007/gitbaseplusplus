import { BranchIcon } from "@/icons/branch";
import { UserIcon } from "@/icons/user";
import { useRouter } from "next/router";
import { useState } from "react";
import { format } from "timeago.js";
import MainLayout from "@/layouts/MainLayout";

export default function ProjectPage() {
  const router = useRouter();
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
      </div>
    </main>
  );
}

ProjectPage.getLayout = MainLayout;
