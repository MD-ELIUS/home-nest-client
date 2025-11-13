import { Link } from "react-router";
import { Home, MapPin, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-secondary text-center p-6 animate-fade-in-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="bg-primary/10 p-8 rounded-full shadow-md">
          <AlertTriangle className="w-16 h-16 text-primary animate-pulse" />
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-primary">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold">
          Oops! Page Not Found
        </h2>

        <p className="max-w-xl text-base md:text-lg opacity-80 leading-relaxed">
          It looks like the page you’re looking for doesn’t exist or has been
          moved. Let’s get you back home safely.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-10 flex flex-wrap gap-4 justify-center"
      >
        <Link
          to="/"
          className="btn btn-primary btn-outline flex items-center gap-2"
        >
          <Home className="w-5 h-5" /> Back to Home
        </Link>

        <Link
          to="/all-properties"
          className="btn btn-secondary btn-outline flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" /> Browse Properties
        </Link>
      </motion.div>

      {/* Background Accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        <h1 className="text-[20rem] sm:text-[30rem] font-extrabold text-secondary/10 tracking-widest leading-none text-center absolute inset-0 flex items-center justify-center">
          HomeNest
        </h1>
      </motion.div>
    </div>
  );
}
