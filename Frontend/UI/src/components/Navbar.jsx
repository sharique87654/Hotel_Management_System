import { useState } from "react";
import logo from "../assets/main_logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // signout logic
  function signout() {
    localStorage.removeItem("Token");
    navigate("/signin");
  }

  return (
    <header className="flex items-center justify-between w-full bg-black bg-opacity-85 dark:bg-dark px-8 py-4 shadow-md">
      {/* ✅ Left: Logo */}
      <div className="flex items-center">
        <img
          onClick={() => navigate("/home")}
          src={logo}
          alt="logo"
          className="w-40 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ✅ Center: Navigation */}
      <nav className="hidden lg:flex space-x-10">
        <ul className="flex items-center gap-8 text-white text-lg font-medium">
          <ListItem NavLink="/home">Home</ListItem>
          <ListItem NavLink="/rooms">Rooms</ListItem>
          <ListItem NavLink="/contact">Contact</ListItem>
          <ListItem NavLink="/home/admin">Admin</ListItem>
        </ul>
      </nav>

      {/* ✅ Right: Logout Button */}
      <div className="hidden sm:flex items-center">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition"
          onClick={signout}
        >
          Sign Out
        </button>
      </div>

      {/* ✅ Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex flex-col justify-center items-center space-y-1 p-2"
      >
        <span className="block w-7 h-[2px] bg-white"></span>
        <span className="block w-7 h-[2px] bg-white"></span>
        <span className="block w-7 h-[2px] bg-white"></span>
      </button>

      {/* ✅ Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center py-5 space-y-4 lg:hidden">
          <ListItem NavLink="/home">Home</ListItem>
          <ListItem NavLink="/rooms">Rooms</ListItem>
          <ListItem NavLink="/contact">Contact</ListItem>
          <ListItem NavLink="/home/admin">Admin</ListItem>
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

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-stone-50 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-red-600 lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
