import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { MapPin } from "lucide-react";

const PropertyCard = ({ property }) => {
  const { user } = useContext(AuthContext);
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
      className="card bg-base-200 border border-base-300 rounded-2xl shadow-md
        hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5
        w-full mx-auto h-[330px] sm:h-[340px] md:h-[300px]"
    >
      {/* Image */}
      <figure className="relative h-44 sm:h-48 lg:h-44 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={propertyName}
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
        />

        {user?.email === userEmail && (
          <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-md shadow">
            My Listing
          </div>
        )}
      </figure>

      {/* Card Body (COMPACT) */}
      <div className="card-body p-2 sm:p-3 flex flex-col gap-1">
        <h3 className="text-sm sm:text-base font-semibold text-primary truncate leading-tight">
          {propertyName || "Untitled Property"}
        </h3>

        <p className="text-xs sm:text-sm font-medium leading-tight">
          <span className="text-secondary">Category:</span> {category}
        </p>

        <p className="text-xs sm:text-sm font-medium opacity-80 line-clamp-1 leading-snug min-h-[2.5rem]">
          {description || "No description available."}
        </p>

        <div className="flex items-center justify-between text-xs sm:text-sm font-medium gap-1">
          <span className="flex items-center gap-1 overflow-hidden whitespace-nowrap max-w-[60%]">
            <MapPin className="text-secondary flex-shrink-0" size={14} />{" "}
            <span className="overflow-hidden text-ellipsis">{location || "Unknown"}</span>
          </span>
          <span className="font-semibold text-sm">${price}</span>
        </div>

        <Link
          to={`/property-details/${_id}`}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="btn btn-outline btn-primary w-full font-medium text-xs sm:text-sm py-1 hover:text-white transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
