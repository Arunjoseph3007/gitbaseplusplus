import Navbar from "@/components/Navbar";
import Link from "next/link";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";
import { format } from "timeago.js";
import { CollaboratorsIcon } from "@/icons/collaborators";
import { BranchIcon } from "@/icons/branch";

export default function UserPage() {
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState();
  const { query } = useRouter();
  const { user: myUser } = useUser();
  const isLogedin = myUser?.userName == user?.userName;

  async function fetchDetails() {
    try {
      const userName = query.userName;
      const repoRes = await axios.get(
        `/repository/getUserRepos?username=${userName}`
      );
      if (!repoRes.data.UserDetails) return { notFound: true };
      const user = repoRes.data.UserDetails;

      setRepos(
        repoRes.data.RepoDetails.slice(0, 2).map((repo) => ({
          id: repo.id,
          project: repo.project_id.project_name,
          name: repo.contributors_count,
          createdAt: repo.created_at,
          description: repo.repo_description,
          noOfUsers: 10,
          createdBy: {
            userId: repo.created_by.id,
            userName: repo.created_by.username,
            photoUrl: process.env.NEXT_PUBLIC_API + repo.created_by.profile_pic,
          },
        }))
      );

      setUser({
        userName: user.username,
        lastName: user.last_name,
        firstName: user.first_name,
        email: user.email,
        bio: user.bio,
        photoUrl: process.env.NEXT_PUBLIC_API + user.profile_pic,
      });

      setProjects(
        repoRes.data.ProjectDetails.slice(0, 2).map((proj) => ({
          name: proj.project_name,
          createdAt: proj.created_at,
          description: proj.project_description,
          noOfRepos: proj.repos_count,
          noOfUsers: proj.members_count,
        }))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [query.userName]);

  return (
    <div className="md:h-screen flex flex-col">
      <div>
        <Navbar />
      </div>

      <div className="bg-base-200 flex flex-1 overflow-y-hidden flex-col md:flex-row">
        {/* //? SIDE-BAR */}
        <div className="md:w-[30%] bg-white pb-5">
          {/* //@ User details */}
          <div className="flex flex-col mt-[1rem]">
            <div className="flex justify-center text-4xl font-serif">
              {isLogedin ? myUser?.firstName : user?.firstName}{" "}
              {isLogedin ? myUser?.lastName : user?.lastName}
            </div>
            <div className="flex justify-center text-xl font-sans ">
              {user?.userName}
            </div>
          </div>
          <div className="avatar flex justify-center mt-[1rem]">
            <div className="w-[15rem] rounded-full overflow-hidden shadow-xl border border-base-300 ">
              <img
                className="overflow-hidden opacity-90 "
                src={isLogedin ? myUser?.photoUrl : user?.photoUrl}
              />
            </div>
          </div>
          <div className="flex flex-1 px-10 mt-2 font-light justify-center text-center">
            {user?.bio}
          </div>
          {/* //@ Edit profile btn */}
          {myUser?.userName === query.userName && (
            <Link href={"/profile"}>
              <div className="flex justify-center mt-[2rem]">
                <label className="btn btn-outline btn-sm md:btn-wide">
                  Edit Profile
                </label>
              </div>
            </Link>
          )}
        </div>

        {/* //? MAIN WINDOW  (Right) */}
        <div className="md:w-[70%] flex flex-col flex-1 px-2 overflow-y-scroll">
          {/* Projects */}
          <div className="px-8 my-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Recent Project</p>
              {myUser?.userName === query.userName && (
                <Link href="/projects">
                  <a className="btn btn-sm">All projects</a>
                </Link>
              )}
            </div>
            <div className="h-[2px] w-full my-2 bg-gray-300" />
            {projects.length == 0 && (
              <div className="flex justify-center my-16">
                <h2 className="text-2xl font-bold">No projects Found</h2>
              </div>
            )}
            {projects.map((project) => (
              <div
                className="bg-white my-1 flex flex-1 items-center justify-between gap-4 p-3 border shadow rounded-md basis-[450px]"
                key={project.id}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium">
                      <Link href={"/projects/" + project.name}>
                        {project.name}
                      </Link>
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

          {/* Repos */}
          <div className="px-8 my-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Recent Repositories</p>
              {myUser?.userName === query.userName && (
                <Link href="/repos">
                  <a className="btn btn-sm">All Repos</a>
                </Link>
              )}
            </div>
            <div className="h-[2px] w-full my-2 bg-gray-300" />
            {repos.length == 0 && (
              <div className="flex justify-center my-16">
                <h2 className="text-2xl font-bold">No Repositories Found</h2>
              </div>
            )}
            {repos.map((repo) => (
              <div
                className="bg-white flex justify-between gap-3 p-3 my-2 border shadow rounded-md"
                key={repo.id}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium underline">
                      <Link href={`/${repo.project}/${repo.name}`}>
                        {repo.project + "/" + repo.name}
                      </Link>
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
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
