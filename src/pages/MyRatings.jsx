import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";
import usePageTitle from "../hooks/usePageTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import LoadingData from "../Loader/LoadingData";
import { Link } from "react-router";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [properties, setProperties] = useState([]);

  usePageTitle("My Ratings | HomeNest Real Estate");

  useEffect(() => {
    if (user?.email && user?.accessToken) {
      setLoading(true);
      axiosSecure
        .get(`/reviews?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching user reviews:", err))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    setLoadingProperties(true);
    fetch("http://localhost:5205/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoadingProperties(false);
      });
  }, []);

  const getPropertyInfo = (propertyId) => {
    return properties.find((p) => p._id === propertyId);
  };

  if (loading || loadingProperties) return <LoadingData />;

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8">
        My Ratings & Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center text-secondary/70 text-lg py-16 bg-base-200 rounded-xl shadow-md animate-fade-in-center">
          <p>You haven't submitted any reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev, idx) => {
            const property = getPropertyInfo(rev.propertyId);

            if (!property) return null; // safeguard

            return (
              <div
                key={idx}
                className="bg-base-100 border border-base-300 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-left-to-center"
              >
                {/* Property Thumbnail */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={
                      property.imageUrl ||
                      "https://i.ibb.co/5RHR6QZ/placeholder-image.jpg"
                    }
                    alt={property.propertyName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Review Info */}
                <div className="p-4 space-y-2 animate-fade-in-center">
                  <h3 className="text-lg font-bold text-primary line-clamp-1">
                    {property.propertyName}
                  </h3>

                  <div className="flex items-center justify-between">
                    <Rating style={{ maxWidth: 110 }} readOnly value={rev.rating} />
                    <span className="text-sm opacity-80">
                      {new Date(rev.reviewDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className=" text-sm opacity-80 line-clamp-3">
                    {rev.reviewText}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-base-300">
                    <img
                      src={rev.reviewerImage}
                      alt={rev.reviewerName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <p className="font-semibold text-secondary text-sm">
                        {rev.reviewerName}
                      </p>
                      <p className="text-xs text-secondary/60">
                        {rev.reviewerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`/property-details/${property._id}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="btn btn-outline btn-primary btn-sm w-full"
                    >
                      View Property
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRatings;
