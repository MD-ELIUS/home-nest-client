import React, { useEffect, useState } from "react";
import LoadingHome from "../../Loader/LoadingHome";
import PropertyCard from "../common/PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5205/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperties(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingHome />;

  return (
    <section className="bg-base-200 py-8 sm:py-10 md:py-14 lg:py-16 animate-fade-in-center">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Responsive Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 text-secondary leading-tight">
          Featured <span className="text-primary">Real Estate</span>
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button className="btn btn-primary btn-outline px-6 sm:px-8 md:px-10 font-semibold shadow-md hover:shadow-lg transition text-sm sm:text-base">
            Show All
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
