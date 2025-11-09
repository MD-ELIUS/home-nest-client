import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import userImg from "../../assets/avatar.png";
import logoImg from "../../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [user, setUser] = useState(true);

    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // theme toggle
    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
        setUser(false)
    };

    const links = (
        <>
            <li><NavLink to="/" className=" text-secondary font-medium">Home</NavLink></li>
            <li><NavLink to="/all-properties" className=" text-secondary font-medium">All Properties</NavLink></li>
            <li><NavLink to="/add-property" className=" text-secondary font-medium">Add Property</NavLink></li>
            <li><NavLink to="/my-properties" className=" text-secondary font-medium">My Properties</NavLink></li>
            <li><NavLink to="/my-ratings" className=" text-secondary font-medium">My Ratings</NavLink></li>
        </>
    );

    return (
        <div className="bg-base-100 nav shadow-md  w-full top-0 left-0 z-50">
            <div className=" w-11/12 mx-auto flex justify-between items-center py-2 sm:py-3 md:py-4">

                {/* Left Section - Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <div>
                        <img
                            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
                            src={logoImg}
                            alt=""
                        />
                    </div>
                    <div>
                        <span className="text-base-content text-[20px] xl:text-[22px] 2xl:text-[24px]">Home</span>
                        <span className="text-primary text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] 2xl:text-[28px]">Nest</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex">
                    <ul className="menu menu-horizontal px-1 activeClass  space-x-2 md:text-[12px] xl:text-base font-medium">{links}</ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost text-base-content p-1 text-2xl sm:text-3xl"
                    >
                        {menuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">

                    {/* Desktop Auth Buttons */}
                    <div className="hidden xl:flex items-center gap-2">
                        {user ? (
                            <>
                               <div className="dropdown dropdown-end hidden md:flex">
                {/* Avatar trigger */}
                <div tabIndex={0} role="button" className="btn btn-ghost h-14 w-14 btn-circle avatar">

                    <img
                        src={user?.photoURL ? user.photoURL : userImg}
                        alt="User Avatar"
                        className="object-cover w-full h-full rounded-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = userImg;
                        }}
                    />

                </div>

                {/* Dropdown content */}
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-18 z-[10] p-4 shadow-xl bg-base-100 rounded-xl w-56 border border-bas>e-200"
                >
                    <li className="text-center border-b pb-2 mb-2">
                        <Link to='/profile' className="font-semibold text-xl text-primary">
                            {user?.displayName || "User"}
                        </Link>

                    </li>

                    <li>
                        <button
                          
                            className="btn btn-primary  w-full"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-primary btn-outline w-fit font-semibold md:px-4 xl:px-6">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-outline w-fit font-semibold md:px-4 xl:px-6">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <label className="flex items-center cursor-pointer gap-2">
                        <span className="text-base-content sm:inline text-sm md:text-base">
                            {theme === "light" ? "Dark" : "Light"}
                        </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-success"
                            onChange={(e) => handleTheme(e.target.checked)}
                            defaultChecked={theme === "dark"}
                        />
                    </label>

                </div>
            </div>

            {/* Mobile Menu Content */}
            {menuOpen && (
                <div className="xl:hidden   nav ">
                    <ul className="menu  activeClass  space-y-2"> <li><NavLink onClick={() => setMenuOpen(!menuOpen)} to="/" className="text-secondary text-[16px] font-medium">Home</NavLink></li>
                        <li><NavLink onClick={() => setMenuOpen(!menuOpen)} to="/all-properties" className="text-secondary text-[16px] font-medium">All Properties</NavLink></li>
                        <li><NavLink onClick={() => setMenuOpen(!menuOpen)} to="/add-property" className="text-secondary text-[16px] font-medium">Add Property</NavLink></li>
                        <li><NavLink onClick={() => setMenuOpen(!menuOpen)} to="/my-properties" className="text-secondary text-[16px] font-medium">My Properties</NavLink></li>
                        <li><NavLink onClick={() => setMenuOpen(!menuOpen)} to="/my-ratings" className="text-secondary text-[16px] font-medium">My Ratings</NavLink></li></ul>
                    <div className="px-3 pb-4 flex flex-col gap-2">
                        {user ? (
                            <>
                            <div className="flex flex-col justify-center items-center">

                                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
                                    <img
                                        src={user?.photoURL || userImg}
                                        alt="User Avatar"
                                        className="rounded-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = userImg; }}
                                    />
                                </div>

                            </div>
                             <button className="btn btn-primary w-full font-semibold md:px-4 xl:px-6">Sign Out</button>
                            </>
                           
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-primary w-full font-semibold md:px-4 xl:px-6">Login</Link>
                                <Link to="/register" className="btn btn-primary w-full font-semibold md:px-4 xl:px-6">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
