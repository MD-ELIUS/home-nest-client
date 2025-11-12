import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { MapPin } from "lucide-react";

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
      className="card bg-base-100 dark:bg-base-200 border border-base-300 rounded-2xl shadow-md 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-left-to-center
        w-full md:max-w-md lg:max-w-lg mx-auto"
    >
      {/* Image */}
      <figure className="relative h-52 sm:h-64 lg:h-56 overflow-hidden rounded-t-2xl">
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
      <div className="card-body p-3 sm:p-4 md:p-5 space-y-2">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-secondary truncate">
          {propertyName || "Untitled Property"}
        </h3>

        <p className="text-sm sm:text-base text-gray-500 font-medium dark:text-neutral">
          Category: <span className="font-medium text-primary">{category}</span>
        </p>

        <p className="text-sm sm:text-base font-medium text-gray-500 dark:text-neutral  line-clamp-3">
          {description || "No description available."}
        </p>

        <div className="flex items-center font-medium justify-between text-sm sm:text-base text-gray-500 dark:text-gray-400 gap-1">
          <span className="flex items-center gap-1 truncate sm:max-w-[60%]">
            <MapPin size={16} /> {location}
          </span>
          <span className="font-semibold text-primary">${price}</span>
        </div>

        <Link
          to={`/property-details/${_id}`}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="btn btn-outline btn-primary w-full font-medium hover:text-white text-sm sm:text-base transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
