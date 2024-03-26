import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const [new_password, setNewPassword] = useState("");
  const { query, router } = useRouter();
  const token = query.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.postForm(
        "https://gitbase.pythonanywhere.com/accounts/change_password",
        { new_password },
        { params: { token } }
      );

      if (status == 200) {
        toast.success("Password changed succesfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="avatar">
          <div className="w-20 md:w-24">
            <img src="/logo4.png" alt="Git" className="object-contain" />
          </div>
        </div>
        <div className="text-center ">
          <h1 className="text-sm md:text-xl font-bold">Change password</h1>
        </div>

        <div className="card text-[0.8rem] md:text-[0.875rem] flex-shrink-0 w-full max-w-[13rem] md:max-w-sm shadow-lg md:shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit}
            className="card-body p-[1.7rem] sm:p-[2rem]"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary btn-xs sm:btn-sm">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
