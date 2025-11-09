import React from "react";
import logoImg from ".././assets/logo.png"
import { Link } from "react-router";

const LoadingHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in-center">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary border-t-transparent animate-spin mb-6"></div>

      {/* Loading text */}
      <p className="text-lg font-semibold text-secondary mb-2">
        Preparing your page...
      </p>
      <p className="text-base text-base-300">
        Loading your data. Thank you for your patience.
      </p>
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
    </div>
  );
};

export default LoadingHome;
