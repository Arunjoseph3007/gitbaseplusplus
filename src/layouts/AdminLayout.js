import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminLayout(page) {
  const router = useRouter();
  const curMode = router.pathname.slice(1);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="w-[270px] bg-neutral text-white p-4 flex flex-col gap-3">
        <Link href={"/admin/projects"}>
              <a
                className={`px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer ${
                  "projects" == curMode && "bg-gray-800"
                }`}
              >
                Projects
              </a>
            </Link>
        <Link href={"/admin/users"}>
              <a
                className={`px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer ${
                  "users" == curMode && "bg-gray-800"
                }`}
              >
                Users
              </a>
            </Link>
        <Link href={"/admin/adduser"}>
              <a
                className={`px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer ${
                  "adduser" == curMode && "bg-gray-800 flex "
                }`}
              >
                Add User 
              </a>
                
            </Link>

         
        </div>
        <div className="flex-1 flex justify-center overflow-scroll">
          <div className="w-[1000px]">{page}</div>
        </div>
      </div>
    </div>
  );
}
