import UserLayout from "@/layouts/UserLayout";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-4xl font-medium mt-2 px-4 py-2">Profile</h1>
      <hr/>
    </div>
  );
}

ProfilePage.getLayout = UserLayout;
