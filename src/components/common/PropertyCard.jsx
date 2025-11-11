import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";

const PropertyCard = ({ property }) => {
  const { user } = use(AuthContext);
  const {
    _id,
    propertyName,
    category,
    description,
    location,
    price,
    imageUrl,
    userEmail,
  } = property || {};

  return (
    <div
      className="card bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-1 animate-left-to-center 
      w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      {/* Image */}
      <figure className="relative h-32 sm:h-44 md:h-52 lg:h-56 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={propertyName}
          className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-110"
        />

        {user?.email === userEmail && (
          <div className="absolute top-2 right-2 bg-primary text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md shadow">
            My Listing
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body p-3 sm:p-4 md:p-5">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-secondary mb-1">
          {propertyName || "Untitled Property"}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
          Category: <span className="font-medium text-primary">{category}</span>
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2 mb-2">
          {description || "No description available."}
        </p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1 truncate max-w-[65%]">
            <i className="fa-solid fa-location-dot text-primary"></i> {location}
          </span>
          <span className="font-semibold text-primary">${price}</span>
        </div>

        <Link
          to={user ? `/property/${_id}` : "/login"}
          className="btn btn-outline btn-primary w-full font-medium hover:text-white transition-all text-xs sm:text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
