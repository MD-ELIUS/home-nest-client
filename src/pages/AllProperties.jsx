import React, { useEffect, useState } from "react";
import PropertyCard from "../components/common/PropertyCard";
import LoadingHome from "../Loader/LoadingHome";
import LoadingData from "../Loader/LoadingData";
import usePageTitle from "../hooks/usePageTitle";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("dateDesc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorting, setIsSorting] = useState(true);

  usePageTitle("All Properties | HomeNest Real Estate");


  const handleSearchTerm = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setLoading(true);

    setTimeout(() => {
      const term = value.trim().toLowerCase();
      const filtered = term
        ? allProperties.filter((property) =>
            property.propertyName.toLowerCase().includes(term)
          )
        : allProperties;
      setProperties(filtered);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(true);
    setIsSorting(true);
    fetch(`https://home-nest-api-server-chi.vercel.app/properties?sort=${sortOption}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProperties(data); 
        setProperties(data);
        setLoading(false);
        setIsSorting(false);
      });
  }, [sortOption]);
  

  return (


       <section className=" min-h-screen py-8 lg:py-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-2xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-5 md:mb-7 text-secondary">
          All <span className="text-primary">Properties ({properties.length})</span>
        </h2>

        {/* ---- Filter Controls ---- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-200 p-4 rounded-xl shadow-sm border border-base-300">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by Property Name..."
            value={searchTerm}
            onChange={handleSearchTerm}
            className="input input-bordered w-full md:w-1/3 rounded-xl border-base-300 focus:border-primary focus:outline-none"
          />

          {/* Sort */}
          <div className="flex items-center gap-2 flex-nowrap">
            <span className="font-medium text-secondary dark:text-gray-300 whitespace-nowrap">
              Sort by:
            </span>
            <select
              className="select select-bordered rounded-xl border-base-300 focus:border-primary"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="dateDesc">Newest First</option>
              <option value="dateAsc">Oldest First</option>
              <option value="priceHigh">Price: High → Low</option>
              <option value="priceLow">Price: Low → High</option>
            </select>
          </div>
        </div>

        {(loading || isSorting) ? (
          <LoadingData />
        ) : (
          <>
            {/* ---- Property Grid ---- */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 ">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <div key={property._id}>
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 dark:text-gray-400 py-10">
                  No properties found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  

   
  );
};

export default AllProperties;
