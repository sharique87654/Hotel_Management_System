import logo from "../assets/main_logo.png";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await axios.post("http://localhost:3000/", {
        firstname,
        lastname,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage({ text: "User created successfully", type: "success" });
      }
    } catch (err) {
      if (err.response.status === 400) {
        setMessage({ text: "Invalid input", type: "error" });
      } else if (err.response.status === 409) {
        setMessage({ text: "User already exists", type: "error" });
      } else {
        setMessage({
          text: "Network error or server not responding",
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">
        <div className="w-full max-w-md backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              alt="Your Company"
              src={logo}
              className="h-32 w-64 object-contain mb-4 drop-shadow-lg"
            />
            <h2 className="text-3xl font-bold tracking-tight text-sky-300 drop-shadow-md">
              Create Your Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join us and start your journey today.
            </p>
          </div>

          {/* Form */}
          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-sky-200"
              >
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="John"
                required
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-sky-200"
              >
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Wick"
                required
                onChange={(e) => setLastname(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sky-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-600 bg-slate-900/50 px-4 py-2.5 text-white shadow-inner placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-sky-400 hover:to-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-all"
            >
              Sign Up
            </button>
          </form>

          {/* Message */}
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

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to={"/Signin"}
              className="text-sky-400 font-semibold hover:underline"
            >
              Sign in
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
