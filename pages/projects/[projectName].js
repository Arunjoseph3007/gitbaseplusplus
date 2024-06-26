import { BranchIcon } from "@/icons/branch";
import { UserIcon } from "@/icons/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { CollaboratorsIcon } from "@/icons/collaborators";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import { EditIcon } from "@/icons/edit";
import { TickIcon } from "@/icons/tick";
import { CloseIcon } from "@/icons/close";
import { toast } from "react-toastify";
import AddUserToProjectModal from "@/components/AddUserToProjectModal";
import axios from "@/libs/axios";
import { useUser } from "@/context/userContext";

export default function ProjectPage() {
  const router = useRouter();
  const [tab, setTab] = useState("user");
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");
  const [projectDetails, setProjectDetails] = useState({
    projectName: router.query.projectName,
    projectId: 0,
    createdAt: new Date().toDateString(),
    noOfRepos: 0,
    noOfUsers: 0,
    description: "",
    admin: {
      userId: 0,
      photoUrl: "https://gitbase.pythonanywhere.com" + "/media/default.png",
      userName: "",
    },
  });
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const { user: myUser } = useUser();

  const editDesc = async () => {
    try {
      const res = await axios.putForm(
        "/project/adminProjectUpdate/" + projectDetails.projectId,
        { project_description: desc }
      );

      toast.success("Updated successfully");
      setIsEditing(false);
      setProjectDetails((p) => ({ ...p, description: desc }));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const updateProjectAccess = async (projectAccessId, isManager) => {
    if (!router.query.projectName) return;

    try {
      const res = await axios.put(
        "/project/adminProjectAccess/" + projectAccessId,
        { is_manager: isManager }
      );
      toast.success("Access updated");

      setUsers((prev) =>
        prev.map((u) =>
          u.projectAccessId == projectAccessId ? { ...u, isManager } : u
        )
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const removeProjectAccess = async (projectAccessId) => {
    if (!router.query.projectName) return;

    try {
      const res = await axios.delete(
        "/project/adminProjectAccess/" + projectAccessId
      );
      toast.success("Access revoked");

      setUsers((prev) =>
        prev.filter((u) => u.projectAccessId != projectAccessId)
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchProjectAccess = async () => {
    if (!router.query.projectName) return;

    const res = await axios.get("/project/adminProjectAccess", {
      params: { project_name: router.query.projectName },
    });

    setUsers(
      res.data.map((user) => ({
        projectAccessId: user.id,
        id: user.user_id.id,
        firstName: user.user_id.first_name,
        secondName: user.user_id.last_name,
        email: user.user_id.email,
        userName: user.user_id.username,
        image: "https://gitbase.pythonanywhere.com" + user.user_id.profile_pic,
        isManager: user.is_manager,
      }))
    );
  };

  const fetchRepos = async () => {
    if (!router.query.projectName) return;

    const res = await axios.get("/project/projectRepository", {
      params: { project_name: router.query.projectName },
    });

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
          photoUrl:
            "https://gitbase.pythonanywhere.com" + repo.created_by.profile_pic,
          userName: repo.created_by.username,
        },
      }))
    );
  };

  const fetchProjectDetails = async () => {
    if (!router.query.projectName) return;

    const res = await axios.get("/project/userProjectDetail", {
      params: { project_name: router.query.projectName },
    });

    setProjectDetails({
      projectName: router.query.projectName,
      projectId: res.data.id,
      createdAt: res.data.created_at,
      noOfRepos: res.data.repos_count,
      noOfUsers: res.data.members_count,
      description: res.data.project_description,
      admin: {
        userId: res.data.created_by.id,
        photoUrl:
          "https://gitbase.pythonanywhere.com" +
          res.data.created_by.profile_pic,
        userName: res.data.created_by.username,
      },
    });
  };

  useEffect(() => {
    setDesc(projectDetails.description);
  }, [projectDetails]);

  useEffect(() => {
    fetchProjectAccess();
    fetchProjectDetails();
    fetchRepos();
  }, [router.query.projectName]);

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
                contains {projectDetails.noOfRepos} repos
              </p>
            </div>

            <div className="flex-1">
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

            <Link href={`/${router.query.projectName}/new`}>
              <a className="btn">Create</a>
            </Link>
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
            <div className="relative flex-1">
              <p className="font-semibold text-lg">Description</p>
              {isEditing ? (
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              ) : (
                <p className="text-gray-400 text-sm">
                  {projectDetails.description}
                </p>
              )}

              {isEditing ? (
                <div className="absolute -top-2 -right-2 flex gap-2">
                  <button
                    onClick={() => editDesc()}
                    className="btn btn-circle btn-sm"
                  >
                    <span className="scale-75">
                      <TickIcon />
                    </span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-circle btn-sm"
                  >
                    <span className="scale-75">
                      <CloseIcon />
                    </span>
                  </button>
                </div>
              ) : (
                myUser.isAdmin && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute -top-2 -right-2 btn btn-circle btn-sm"
                  >
                    <span className="scale-75">
                      <EditIcon />
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center mt-10">
          <div role="tablist" className="tabs">
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
        </div>

        {/* User tab */}
        {tab == "user" && (
          <div>
            {myUser.isAdmin && (
              <div className="flex gap-3 items-center max-w-[850px] mx-auto my-6">
                <input
                  className="input input-bordered rounded-full flex-1"
                  placeholder="Search users..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <AddUserToProjectModal
                  refetchProjectAccess={fetchProjectAccess}
                />
              </div>
            )}
            {users
              .filter(
                (user) =>
                  user.secondName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  user.userName.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
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
                      <Link href={`/${user.userName}`}>
                        <a className="text-lg font-medium">
                          {user.firstName} {user.secondName}
                        </a>
                      </Link>
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
                  {myUser.isAdmin && (
                    <div className="flex flex-col items-end gap-1">
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-success w-36">
                          Change Role
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content border-2 menu p-2 shadow-xl bg-base-100 rounded-box w-52"
                        >
                          <li
                            onClick={() =>
                              updateProjectAccess(user.projectAccessId, true)
                            }
                          >
                            <a>Manager {user.isManager && <TickIcon />}</a>
                          </li>
                          <li
                            onClick={() =>
                              updateProjectAccess(user.projectAccessId, false)
                            }
                          >
                            <a>Developer {!user.isManager && <TickIcon />}</a>
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={() =>
                          removeProjectAccess(user.projectAccessId)
                        }
                        className="btn btn-error w-36"
                      >
                        Remove User
                      </button>
                    </div>
                  )}
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
                    <Link href={"/" + repo.project + "/" + repo.name}>
                      <h3 className="text-lg font-medium underline cursor-pointer">
                        {repo.project}/{repo.name}
                      </h3>
                    </Link>
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
