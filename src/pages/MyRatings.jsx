import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";
import usePageTitle from "../hooks/usePageTitle";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import LoadingData from "../Loader/LoadingData";
import { Link } from "react-router";
import Swal from "sweetalert2";
import demoImg from "../assets/avatar.png";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);
  const [properties, setProperties] = useState([]);

  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingProperties, setLoadingProperties] = useState(true);

  usePageTitle("My Ratings | HomeNest Real Estate");

  /* ================= USER REVIEWS ================= */
  useEffect(() => {
    if (!user?.email) return;

    setLoadingReviews(true);
    axiosSecure
      .get(`/reviews?email=${user.email}`)
      .then((res) => {
        setReviews(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      })
      .finally(() => setLoadingReviews(false));
  }, [user?.email, axiosSecure]);

  /* ================= ALL PROPERTIES ================= */
  useEffect(() => {
    setLoadingProperties(true);

    fetch("https://home-nest-api-server-chi.vercel.app/properties")
      .then((res) => res.json())
      .then((data) => {
        // ✅ VERY IMPORTANT SAFETY CHECK
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (Array.isArray(data?.data)) {
          setProperties(data.data);
        } else {
          console.error("Invalid properties response:", data);
          setProperties([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setProperties([]);
      })
      .finally(() => setLoadingProperties(false));
  }, []);

  /* ================= DELETE REVIEW ================= */
  const handleDeleteReview = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5BA600",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.delete(`/reviews/${id}`);

        if (res.data?.deletedCount > 0) {
          setReviews((prev) => prev.filter((rev) => rev._id !== id));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the review.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    });
  };

  /* ================= SAFE PROPERTY LOOKUP ================= */
  const getPropertyInfo = (propertyId) => {
    if (!Array.isArray(properties)) return null;
    return properties.find((p) => p._id === propertyId) || null;
  };

  if (loadingReviews || loadingProperties) return <LoadingData />;

  return (
    <div className="w-11/12 mx-auto md:w-full ">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-7 text-secondary">
        My <span className="text-primary">Ratings</span>{" "}
        <span className="text-primary">({reviews.length})</span>
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center text-secondary/70 text-lg py-16 animate-fade-in-center">
          <p>You haven't submitted any reviews yet.</p>
        </div>
      ) : (
        <div className="  grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {reviews.map((rev) => {
            const property = getPropertyInfo(rev.propertyId);
            if (!property) return null;

            return (
              <div
                key={rev._id}
                className="bg-base-200 border border-base-300 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-left-to-center"
              >
                {/* Property Image */}
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
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-primary line-clamp-1">
                    {property.propertyName}
                  </h3>

                  <div className="flex items-center justify-between">
                    <Rating
                      style={{ maxWidth: 110 }}
                      readOnly
                      value={rev.rating}
                    />
                    <span className="text-sm opacity-80">
                      {new Date(rev.reviewDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-sm opacity-80 line-clamp-3">
                    {rev.reviewText}
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-base-300">
                    <img
                      src={rev.reviewerImage || demoImg}
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

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      onClick={() => handleDeleteReview(rev._id)}
                      className="btn btn-outline btn-error btn-sm w-full"
                    >
                      Delete
                    </button>

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
