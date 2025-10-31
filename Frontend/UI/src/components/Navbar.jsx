import { useState } from "react";
import logo from "../assets/main_logo.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

      // signout logic
      function signout(){
        localStorage.removeItem("Token");
            navigate("/signin")
      }


  return (
    <header className={`flex  w-full items-center bg-black dark:bg-dark bg-opacity-85`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 ">
              <img
                src={logo}
                alt="logo"
                className="hidden dark:block ml-14"
              />
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } ml-32 `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/home">Home</ListItem>
                  <ListItem NavLink="/rooms">Rooms</ListItem>
                  <ListItem NavLink="/contact">Contact</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0 bg-red-700 rounded-full ">
                <button className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white" onClick={signout}>
                Signout
                </button>
            </div>
          </div>
        </div>
      </div>
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