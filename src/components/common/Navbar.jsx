import { useState, useEffect, use } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import userImg from "../../assets/avatar.png";
import logoImg from "../../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../provider/AuthContext";
import Switch from "../Switch";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const { user, signOutUser } = use(AuthContext);

    console.log(user)
    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // theme toggle
    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
        
    };

     const handleLogOut = () => {
        signOutUser()
            .then(() => {
                setMenuOpen(false)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

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
                        className="object-cover w-full h-full outline-2 outline-secondary rounded-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = userImg;
                        }}
                    />

                </div>

                {/* Dropdown content */}
          <ul
  tabIndex={0}
  className=" dropdown-content mt-20 z-[50] p-4 shadow-xl bg-base-100 rounded-xl w-56 border border-secondary overflow-hidden"
>

  <li className="flex flex-col items-center text-center border-b border-secondary pb-2 mb-2">
    <Link
      to="/"
      className="font-semibold text-xl text-secondary truncate w-full text-center"
    >
      {user?.displayName || "User"}
    </Link>
    <Link
      to="/"
      className="font-medium text-[14px] text-secondary break-words w-full text-center"
    >
      {user?.email || "user@example.com"}
    </Link>
  </li>

  <li className="mt-2">
    <button
      onClick={handleLogOut}
      className="btn btn-primary btn-outline w-full"
    >
      Sign Out
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
            <div className="flex items-center gap-2">

  <Switch checked={theme === "dark"} onChange={handleTheme} />
</div>

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

                                  <div className="btn btn-ghost btn-circle avatar h-14 w-14">
                                    <img
                                        src={user?.photoURL || userImg}
                                        alt="User Avatar"
                                        className="rounded-full outline-2 outline-secondary object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = userImg; }}
                                    />
                                </div>

                                <div  className="font-semibold text-xl text-secondary w-full text-center">
                                    {user.displayName}
                                </div>

                                <div className="font-medium text-[14px] text-secondary  w-full text-center">
                                    {user.email}
                                </div>

                            </div>
                             <button onClick={handleLogOut} className="btn btn-primary btn-outline w-full font-semibold md:px-4 xl:px-6">Sign Out</button>
                            </>
                           
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(!menuOpen)} className="btn btn-primary btn-outline w-full font-semibold md:px-4 xl:px-6">Login</Link>
                                <Link to="/register" onClick={() => setMenuOpen(!menuOpen)} className="btn btn-primary btn-outline w-full font-semibold md:px-4 xl:px-6">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
