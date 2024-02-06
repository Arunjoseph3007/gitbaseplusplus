import { BranchIcon } from "@/icons/branch";
import { CollaboratorsIcon } from "@/icons/collaborators";
import AdminLayout from "@/layouts/AdminLayout";
import Link from "next/link";
import { format } from "timeago.js";

const projects = new Array(8).fill(0).map((_, i) => ({
  id: i,
  name: "Project " + i,
  createdAt: new Date().toDateString(),
  description:
    "Project description goes here Project description goes here Project description goes here Project ",
  noOfRepos: 4,
  noOfUsers: 16,
}));

export default function AdminProjects() {
  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2 ">Projects</h1>
      <hr />
      <div className="mt-4 mx-4 flex flex-wrap gap-3 justify-center">
        {projects.map((project) => (
          <div
            className="flex flex-1 items-center justify-between gap-4 p-3 border shadow rounded-md basis-[450px]"
            key={project.id}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium">
                  <Link href={"/" + project.name}>{project.name}</Link>
                </h3>
                <div className="w-[6px] aspect-square rounded-full bg-gray-300"></div>
                <p className="text-gray-400 text-sm">
                  created {format(project.createdAt)}
                </p>
              </div>
              <p className="max-w-[650px] text-gray-600 font-light text-sm">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-xs [&_svg]:h-4">
                <CollaboratorsIcon /> <p>{project.noOfUsers} members</p>
              </div>
              <div className="flex items-center text-xs [&_svg]:h-3">
                <BranchIcon /> <p>{project.noOfRepos} repos</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

AdminProjects.getLayout = AdminLayout;
