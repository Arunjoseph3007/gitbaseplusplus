import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserLayout(page) {
  const router = useRouter();
  const curMode = router.pathname.slice(1);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="w-[270px] bg-neutral text-white p-4 flex flex-col gap-3">
          {["profile", "repos", "projects"].map((mode) => (
            <Link href={"/" + mode}>
              <a
                className={`px-4 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer capitalize ${
                  mode == curMode && "bg-gray-800"
                }`}
              >
                {mode}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-1 flex justify-center overflow-scroll">
          <div className="w-[1000px]">{page}</div>
        </div>
      </div>
    </div>
  );
}
