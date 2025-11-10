import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const [error, setError] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, signInGoogleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setGoogleError('');
    signInGoogleUser()
      .then(result => {
        setUser(result.user);
        toast.success('Logged in successfully');
        navigate('/');
      })
      .catch(err => setGoogleError(err.message));
  };

  const handlePasswordShow = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoUrl = e.target.photoUrl.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasMinLength = /^.{6,}$/;

    setError('');

    if (!hasUppercase.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    if (!hasLowercase.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }
    if (!hasMinLength.test(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!terms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    createUser(email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        updateProfile(user, { displayName: name, photoURL: photoUrl })
          .then(() => {})
          .catch(err => setError(err.message));

        e.target.reset();
        toast.success('Registered successfully');
        navigate('/');
      })
      .catch(err => {
        if (err.message.includes('auth/email-already-in-use')) {
          toast.error('This email is already registered');
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100  animate-fade-in-center mt-4 sm:mt-6 md:mt-8 lg:mt-10">
      <div className=" w-full max-w-md bg-base-200 shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-base-300 pb-4">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label font-semibold">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Photo URL</label>
            <input
              name="photoUrl"
              type="text"
              placeholder="Enter your photo URL"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div className="relative">
            <label className="label font-semibold">Password</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
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

          <div className="flex items-center">
            <input type="checkbox" name="terms" className="checkbox mr-2" />
            <span className="text-sm">I accept the <Link to="/terms" className="text-primary underline">Terms & Conditions</Link></span>
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary btn-outline w-full mt-2">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} /> Sign up with Google
        </button>

        {googleError && <p className="text-error text-sm mt-2">{googleError}</p>}

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-semibold underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
