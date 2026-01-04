import React, { useEffect, useState } from "react";
import LoadingData from "../../Loader/LoadingData";
import PropertyCard from "../common/PropertyCard";
import { Link } from "react-router";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://home-nest-api-server-chi.vercel.app/latest-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className=" py-8 md:py-10 lg:py-12">
      <div className="w-11/12  mx-auto animate-fade-in-center">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-5 md:mb-7 text-secondary leading-tight">
          Featured <span className="text-primary">Real Estate</span>
        </h2>

        {loading ? (
          <LoadingData />
        ) : (
          <>
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}

        {/* Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            to="/all-properties"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn btn-primary btn-outline px-6 sm:px-8 md:px-10 font-semibold shadow-md hover:shadow-lg transition text-sm sm:text-base"
          >
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
