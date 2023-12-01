import { BranchIcon } from "@/icons/branch";
import { CollaboratorsIcon } from "@/icons/collaborators";
import AdminLayout from "@/layouts/AdminLayout";
import { format } from "timeago.js";

const projects = new Array(7).fill(0).map((_, i) => ({
  id: i,
  name: "Project " + i,
  createdAt: new Date().toDateString(),
  description:
    "Project description goes here Project description goes here Project description goes here Project description goes here ",
  image: "https://picsum.photos/200",
  noOfRepos: 4,
  noOfUsers:16
}));

export default function AdminProjects() {
  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2">Projects</h1>
      <hr />
      <div>
        {projects.map((project) => (
          <div
            className="flex items-center justify-between gap-3 p-3 my-3 border shadow rounded-md"
            key={project.id}
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-[80px] aspect-square rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium">{project.name}</h3>
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
                <CollaboratorsIcon/> <p>{project.noOfUsers} members</p>
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
