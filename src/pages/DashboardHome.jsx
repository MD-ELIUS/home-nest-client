import React, { useContext } from "react";

import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../provider/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" ">
      {/* Typing animation title */}
      <h1 className="text-3xl  font-bold text-secondary mb-2">
        <TypeAnimation
          sequence={[`Hi, ${user?.displayName || "User"}`, 2000]}
          speed={75}
          cursor={true}
          repeat={0}
        />
      </h1>

      {/* Optional subtitle */}
      <p className="text-secondary text-lg md:text-xl">
        Welcome to your dashboard
      </p>

      {/* Other dashboard content goes here */}
    </div>
  );
};

export default DashboardHome;
