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
  const [projects, setProjects] = useState(
    Array(1)
      .fill(0)
      .map((_, i) => ({
        id: i,
        project_name: "Project " + i,
        created_at: new Date().toDateString(),
        project_description:
          "Project description goes here Project description goes here Project description goes here Project ",
        repos_count: 4,
        members_count: 16,
      }))
  );

  const [createProjectDetails, setCreateProjectDetails] = useState({
    project_name: "",
    project_desc: "",
  });

  const handleChange = (e) =>
    setCreateProjectDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  const createProject = async (e) => {
    if (!createProjectDetails.project_name) {
      toast.error("Enter valid project details");
      return;
    }
    try {
      const res = await axios.post(
        "https://gitbase.pythonanywhere.com" + "/project/adminProject",
        {
          project_name: createProjectDetails.project_name,
          project_description: createProjectDetails.project_desc,
        },
        {
          headers: {
            Authorization: "Token fe79b187e8f57e6f5ee9afefdd14388ae972ee0f",
          },
        }
      );
      toast.success("Project created successfully");
      fetchProjects()
      setCreateProjectDetails({ project_name: "", project_desc: "" });
    } catch (error) {
      toast.error("Couldn't create Project");
    }
  };
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
            className=" flex-1 btn btn-sm btn-outline items-center capitalize justify-center pr-5"
          >
            <span className="scale-90">
              <PlusIcon />
            </span>
            Create Project
          </label>
        </div>
        <input type="checkbox" id="create-project" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box justify-center">
            <label
              htmlFor="create-project"
              className="btn btn-sm rounded-full h-10 w-10 absolute top-5 right-5 rotate-45"
            >
              <PlusIcon />
            </label>
            <h3 className="font-bold text-lg capitalize flex justify-center">
              Create New Project
            </h3>

            <div className="mt-5">
              <form className="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
                <div className="p-6 ">
                  <div>
                    <label
                      htmlFor="project_name"
                      className="font-bold mb-1 text-gray-700 block"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="name"
                      name="project_name"
                      onChange={handleChange}
                      className="input"
                      style={{ width: "100%" }}
                      value={createProjectDetails.project_name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="project_name"
                      className="font-bold mb-1 text-gray-700 block"
                    >
                      Project Description
                    </label>
                    <textarea
                      type="text"
                      placeholder="description"
                      name="project_desc"
                      onChange={handleChange}
                      className="input"
                      style={{ width: "100%" }}
                      value={createProjectDetails.project_desc}
                    />
                  </div>
                </div>
              </form>
              <div className="flex justify-center gap-12">
                <div className="modal-action flex justify-center">
                  <label
                    htmlFor="create-project"
                    className="btn btn-sm md:btn-wide mb-2"
                    onClick={createProject}
                  >
                    Create
                  </label>
                </div>
              </div>
            </div>
          </div>
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
