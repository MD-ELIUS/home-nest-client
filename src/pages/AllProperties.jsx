import React, { useEffect, useState } from "react";
import PropertyCard from "../components/common/PropertyCard";
import LoadingData from "../Loader/LoadingData";
import usePageTitle from "../hooks/usePageTitle";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("dateDesc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  usePageTitle("All Properties | HomeNest Real Estate");

  // 🔹 Fetch data from backend
  useEffect(() => {
    setLoading(true);

    const url = new URL(
      "https://home-nest-api-server-chi.vercel.app/properties"
    );

    url.searchParams.append("page", page);
    url.searchParams.append("limit", 12);
    url.searchParams.append("sort", sortOption);

    if (search) url.searchParams.append("search", search);
    if (category) url.searchParams.append("category", category);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category, sortOption, page]);

  return (
    <section className="min-h-screen py-8 lg:py-10">
      <div className="w-11/12 mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl lg:text-4xl font-bold mb-8 text-secondary">
          All <span className="text-primary">Properties</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-base-200 p-4 rounded-xl border border-base-300 justify-between">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by property name and location..."
            className="input outline-none w-full lg:w-1/3"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          {/* Category */}
          <select
            className="select outline-none w-full lg:w-1/4"
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
          </select>

          {/* Sort */}
          <select
            className="select outline-none w-full lg:w-1/4"
            value={sortOption}
            onChange={(e) => {
              setPage(1);
              setSortOption(e.target.value);
            }}
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="priceLow">Price: Low → High</option>
          </select>
        </div>

        {/* Data */}
        {loading ? (
          <LoadingData />
        ) : properties.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2">
              <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num + 1)}
                  className={`btn btn-sm ${
                    page === num + 1 ? "btn-primary" : ""
                  }`}
                >
                  {num + 1}
                </button>
              ))}

              <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No properties found.
          </p>
        )}
      </div>
    </section>
  );
};

export default AllProperties;
