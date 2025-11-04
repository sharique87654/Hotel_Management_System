import logo from "../assets/main_logo.png";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin({
  roomName,
  description,
  roomType,
  price,
  noOfBed,
}) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", true);
        const pathname = localStorage.getItem("path");
        console.log(pathname);

        if (pathname) {
          console.log("mji");

          navigate(pathname);
        } else {
          navigate("/");
        }
      }
      console.log(response, "RESPONSE");
    } catch (error) {
      if (error.response.status === 411) {
        setMessage({ text: "Wrong input", type: "error" });
      } else if (error.response.status === 401) {
        setMessage({ text: "Unauthorized user. Please go to the signup page" });
      } else {
        setMessage({ text: "An unexpected error occurred" });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">
        <div className="w-full max-w-md backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="flex flex-col items-center">
            <img
              alt="logo"
              src={logo}
              className="h-32 w-64 object-contain mb-6 drop-shadow-lg"
            />
            <h2 className="text-3xl font-bold tracking-tight text-sky-300 drop-shadow-md">
              Sign in to your account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* ✅ Form */}
          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sky-200"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@gmail.com"
                required
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-sky-200"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                autoComplete="current-password"
                onChange={(e) => setpassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-sky-400 hover:to-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-all"
            >
              Sign In
            </button>
          </form>

          {/* ✅ Message */}
          {message ? (
            <div
              className={`mt-6 p-3 rounded-lg text-center font-medium ${
                message.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          {/* ✅ Footer */}
          <p className="mt-8 text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-sky-400 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
          <div className="text-center mt-4">
            <Link
              to={"/home/admin"}
              className="text-sky-400 font-semibold hover:underline text-lg"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
