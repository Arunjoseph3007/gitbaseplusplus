import { BranchIcon } from "@/icons/branch";
import { CollaboratorsIcon } from "@/icons/collaborators";
import { PlusIcon } from "@/icons/plus";
import AdminLayout from "@/layouts/AdminLayout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "timeago.js";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);

  async function fetchProjects() {
    try {
      let config = {
        headers: {
          Authorization: "Token fe79b187e8f57e6f5ee9afefdd14388ae972ee0f",
        },
      };
      const allProjects = await axios.get(
        "https://gitbase.pythonanywhere.com" + "/project/adminProject",
        config
      );
      setProjects(allProjects.data);
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mx-4 py-4">
        <h1 className="text-4xl font-medium ">Projects</h1>
        <div className="form-control flex items-center">
          <label
            htmlFor="create-project"
            className=" flex-1 btn btn-sm btn-outline items-center gap-1 capitalize"
          >
            Create Project
            <PlusIcon />
          </label>
        </div>
      </div>
      <hr />
      <div className="mt-4 mx-4 flex flex-wrap gap-3 justify-center">
        {projects.map((project) => (
          <div
            className="flex flex-1 items-center justify-between gap-4 p-3 border shadow rounded-md basis-[450px]"
            key={project.project_name}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium">
                  <Link href={"/" + project.name}>{project.project_name}</Link>
                </h3>
                <div className="w-[6px] aspect-square rounded-full bg-gray-300"></div>
                <p className="text-gray-400 text-sm">
                  created {format(project.created_at)}
                </p>
              </div>
              <p className="max-w-[650px] text-gray-600 font-light text-sm">
                {project.project_description}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center text-xs [&_svg]:h-4">
                <CollaboratorsIcon /> <p>{project.members_count} members</p>
              </div>
              <div className="flex items-center text-xs [&_svg]:h-3">
                <BranchIcon /> <p>{project.repos_count} repos</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

AdminProjects.getLayout = AdminLayout;
