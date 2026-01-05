import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import logoImg from "../assets/logo.png";
import {
  FaHome,
  FaSignOutAlt,
  FaThLarge,
  FaBars,
  FaTimes,
  FaStarOfDavid,
  FaUserEdit,
} from "react-icons/fa";
import Switch from "../components/Switch";
import userImg from "../assets/avatar.png";
import { MdAddCircle, MdClose, MdFilterList, MdOutlineStar } from "react-icons/md";
import { FiHome, FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  // Logout
    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate("/login")
            })
            .catch(error => {
                console.log(error.message)
            })
    }

  // Sidebar content
  const SidebarContent = () => (
    <nav className="p-6 space-y-2 ">
      <NavLink
        to="/dashboard"
        end
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
        <FaHome /> Dashboard Home
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        end
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
        <FaUserEdit /> My Profile
      </NavLink>
      <NavLink
        to="/dashboard/my-properties"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
       <MdFilterList /> My Properties
      </NavLink>
      <NavLink
        to="/dashboard/my-ratings"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
        <FaStarOfDavid /> My Ratings
      </NavLink>
      <NavLink
        to="/dashboard/add-property"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
        <MdAddCircle /> Add property
      </NavLink>
      
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
            isActive ? "bg-primary text-white" : "hover:bg-primary/10 text-secondary"
          }`
        }
      >
        <FiHome /> Home
      </NavLink>
    </nav>
  );

  return (
    <div className="min-h-screen bg-base-200">
      {/* TOP NAVBAR */}
      <header className="h-16 w-full bg-base-100 border-b border-base-300 flex items-center justify-between  mx-auto sticky top-0 z-50 px-6">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
<button
  onClick={() => setOpen(!open)} // toggle open state
  className="md:hidden text-secondary  rounded-md hover:bg-base-200"
>
  {open ? <MdClose size={24} /> : <FiMenu size={24} />}
</button>


          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img className="h-10 w-10 md:h-12 sm:w-12" src={logoImg} alt="" />
            <div className="flex gap-[2px]">
              <span className="text-base-content text-[20px] xl:text-[22px] 2xl:text-[24px]">
                Home
              </span>
              <span className="text-primary text-[20px] xl:text-[22px] 2xl:text-[24px]">
                Nest
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Switch checked={theme === "dark"} onChange={handleTheme} />

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer  py-1 rounded-lg hover:bg-base-200"
            >
              <img
                src={user?.photoURL || userImg}
                alt="profile"
                className="h-10 w-10 md:h-12 sm:w-12 rounded-full border-2 border-primary"
              />
            </label>

            {/* Dropdown Style */}
            <ul className="dropdown-content mt-3 p-4 shadow-xl bg-base-100 rounded-xl w-56 border border-secondary z-[60] overflow-hidden">
           

              <li className="mt-2">
                <NavLink
                  to="/dashboard/profile"
                className="btn btn-primary btn-outline w-full flex items-center justify-center gap-2"
                >
                  My Profile
                </NavLink>
              </li>

              <li className="mt-2">
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary btn-outline w-full flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-base-100 border-r border-base-300 z-40">
        
          <SidebarContent />
        </aside>

        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
{/* Mobile Sidebar */}
<aside
  className={`fixed top-16 pl-2 h-[calc(100vh-64px)] w-64 bg-base-100 border-r border-base-300 z-50
  transform transition-transform duration-300 md:hidden
  ${open ? "translate-x-0" : "-translate-x-full"}`}
>
  
  <SidebarContent />
</aside>


        {/* Main Content */}
        <main className="flex-1 md:px-6 py-6 md:ml-64 min-h-[calc(100vh-64px)] bg-base-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
