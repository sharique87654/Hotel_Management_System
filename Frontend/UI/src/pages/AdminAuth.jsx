import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminAuth() {
  const [adminName, setadminName] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      const adimData = await axios.post("http://localhost:3000/admin/auth", {
        adminName,
        password,
      });
      if (adimData.status === 200) {
        localStorage.setItem("AdminToken", adimData.data.token);
        navigate("/home/admin/adminpage/adminDashboard");
      }
    } catch (error) {
      if (error.response.status === 411) {
        setMessage({ text: "Wrong input", type: "error" });
      } else if (error.response.status === 401) {
        setMessage({ text: "Unauthorized user. You are not Admin!" });
      } else {
        setMessage({ text: "An unexpected error occurred" });
      }
    }
  };

  return (
    <div>
      
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/10">
          {/* Left Side Content */}
          <div className="text-white w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold leading-tight">
              Administrator <span className="text-amber-400">Login</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Restricted access — for authorized administrators only.
            </p>
            <div className="h-[3px] w-1/3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full mx-auto lg:mx-0"></div>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 max-w-md mx-auto border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Welcome Back, Admin
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Admin Username */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Admin Username
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setadminName(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                    placeholder="John Wick"
                    required
                  />
                </div>

                {/* Admin Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300"
                >
                  Login to Dashboard
                </button>
                <button onClick={()=> navigate("/Signin")} className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300">Back to Login</button>
              </form>

              {/* Error Message */}
              {message ? (
                <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300 text-center font-medium">
                  {message.text}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
