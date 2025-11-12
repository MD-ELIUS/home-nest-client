import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router";
import usePageTitle from "../hooks/usePageTitle";

const Login = () => {
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, setUser, signInGoogleUser } = useContext(AuthContext);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

     usePageTitle("Login | HomeNest Real Estate");

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    setGoogleError("");
    signInGoogleUser()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully");
        navigate(`${location.state ? location.state : "/"}`);

          const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    createdAt: new Date().toISOString() // adds current date/time
                }

                     // create user in the database
                fetch('http://localhost:5205/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                .then(res => res.json())
                .then(data => {
                    console.log('data after user save', data)
                })

        
      })
      .catch((err) => setGoogleError(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => setError(err.message));
  };



  return (

   
      
      
   <div className="flex justify-center items-center  bg-base-100   py-4 sm:py-6 md:py-8 lg:py-10">

      <div className=" w-11/12 mx-auto max-w-md bg-base-200 shadow-xl p-6 border border-base-300 rounded-2xl animate-fade-in-center">
      <h2 className="text-center text-2xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-5 md:mb-7 text-secondary">
           Login to <span className="text-primary">Your Account</span>
        </h2>
        {/* <h2 className="text-2xl font-bold text-center mb-6 border-b border-base-300 pb-4">
          Login to Your Account
        </h2> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label font-semibold">Email</label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label font-semibold">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
              required
            />
            <span
              onClick={handlePasswordShow}
              className="absolute top-9.5 right-5 z-10 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Forgot Password */}
          <div
          
            className="text-sm text-right cursor-pointer hover:text-primary"
          >
            Forgot password?
          </div>

          {/* Error */}
          {error && <p className="text-error text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-outline w-full mt-2"
          >
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} /> Login with Google
        </button>

        {googleError && (
          <p className="text-error text-sm mt-2 text-center">{googleError}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-secondary font-semibold underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>


    


  );
};

export default Login;
