import { useState, useEffect, useRef } from "react";
import logo from "../assets/main_logo.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // lowercase
    if (token) {
      try {
        const decoded = jwtDecode(token);
        //(decoded, "decoded data");

        // Use decoded.name or fallback to decoded.email or "User"
        setName(decoded.name || "User");
        setEmail(decoded.email || "noEmail");
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("path");
    navigate("/signin");
  };

  const AuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div className="relative" ref={dropdownRef}>
          {/* User Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            {/* Dynamic Initials */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {name
                ? name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
            {/* Display Name */}
            <span className="text-gray-700 font-medium">{name}</span>
            {/* Arrow */}
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{email}</p>
              </div>

              {/* Menu Items */}
              <button
                onClick={() => {
                  navigate("/mybookings");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition duration-150"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                My Bookings
              </button>

              {/* Divider */}
              <div className="border-t border-gray-100 my-1"></div>

              {/* Sign Out */}
              <button
                onClick={() => {
                  signout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition duration-150 font-medium"
              >
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      );
    } else {
      // When not logged in
      return (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition"
          onClick={() => navigate("/signin")}
        >
          Sign In / Sign Up
        </button>
      );
    }
  };

  // ✅ Main Navbar Layout
  return (
    <header className="flex items-center justify-between w-full bg-black bg-opacity-85 dark:bg-dark px-8 py-4 shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-40 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Center: Navigation */}
      <nav className="hidden lg:flex space-x-10">
        <ul className="flex items-center gap-8 text-white text-lg font-medium">
          <ListItem NavLink="/">Home</ListItem>
          <ListItem NavLink="/rooms">Rooms</ListItem>
          <ListItem NavLink="/contact">Contact</ListItem>
        </ul>
      </nav>

      {/* Right: Auth Buttons */}
      <div className="hidden sm:flex items-center">
        <AuthButtons />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex flex-col justify-center items-center space-y-1 p-2"
      >
        <span className="block w-7 h-[2px] bg-white"></span>
        <span className="block w-7 h-[2px] bg-white"></span>
        <span className="block w-7 h-[2px] bg-white"></span>
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center py-5 space-y-4 lg:hidden">
          <ListItem NavLink="/">Home</ListItem>
          <ListItem NavLink="/rooms">Rooms</ListItem>
          <ListItem NavLink="/contact">Contact</ListItem>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-medium transition"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition"
            onClick={signout}
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

// ✅ Reusable ListItem Component
const ListItem = ({ children, NavLink }) => {
  return (
    <li>
      <a
        href={NavLink}
        className="flex py-2 text-stone-50 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-red-600 lg:ml-12 lg:inline-flex"
      >
        {children}
      </a>
    </li>
  );
};
