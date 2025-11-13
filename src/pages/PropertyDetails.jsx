import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import usePageTitle from '../hooks/usePageTitle';
import { AuthContext } from '../provider/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import userImg from ".././assets/avatar.png";
import { FaMoneyBillWave, FaMapMarkerAlt, FaTags, FaCalendarAlt } from "react-icons/fa";
import LoadingData from '../Loader/LoadingData';
import Swal from 'sweetalert2';
import demoImg from ".././assets/avatar.png";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

usePageTitle(property ? `${property.propertyName} | HomeNest Real Estate` : "Property Details | HomeNest Real Estate");


  useEffect(() => {
    setLoading(true);
    if (user?.email && user?.accessToken && id) {
      axiosSecure
        .get(`/properties/${id}`)
        .then((data) => setProperty(data.data), setLoading(false))
        .catch((err) => console.error('Error fetching property:', err));
    }
  }, [id, user, axiosSecure]);

  useEffect(() => {
  if (id && user?.email && user?.accessToken) {
    axiosSecure
      .get(`/reviews?propertyId=${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }
}, [id, user, axiosSecure]);


useEffect(() => {
  if (id && user?.email && user?.accessToken) {
    axiosSecure
      .get(`/reviews?propertyId=${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }
}, [id, user, axiosSecure]);


const userHasReviewed = reviews.some(
  (rev) => rev.reviewerEmail === user?.email
);



  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewText = e.target.reviewText.value.trim();

    if (!rating || !reviewText) {
      Swal.fire({
        icon: "warning",
        title: "Please fill out all fields",
        text: "Give a rating and write a short review.",
        confirmButtonColor: "#5BA600",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You must be logged in to submit a review.",
        confirmButtonColor: "#5BA600",
      });
      return;
    }

    const newReview = {
      reviewerName: user?.displayName || "Anonymous User",
      reviewerEmail: user?.email || "Not provided",
      reviewerImage: user?.photoURL || "https://i.ibb.co/4mDPWxt/user.png",
      propertyId: id,
      propertyName: property?.propertyName,
      rating,
      reviewText,
      reviewDate: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.post("/reviews", newReview);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Your review has been added successfully.",
          confirmButtonColor: "#5BA600",
        });
      }

      setReviews((prev) => [newReview, ...prev]);
      setRating(0);
      e.target.reset();
    } catch (err) {
      console.error("Error submitting review:", err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not submit your review. Try again later.",
        confirmButtonColor: "#5BA600",
      });
    }
  };





  if (!property || loading) {
    return <LoadingData></LoadingData>;
  }

  const {
    propertyName,
    description,
    price,
    location,
    category,
    imageUrl,
    created_at,
    userName,
    userEmail,
    userImage,
  } = property;

  return (
    <div className="w-11/12 mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-10 ">
      {/* Property Card */}
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-5 animate-fade-in-center">
        {/* Left Image */}
<div className='flex flex-col gap-5 relative'>
  <img
    src={imageUrl || 'https://i.ibb.co/5RHR6QZ/placeholder-image.jpg'}
    alt={propertyName}
    className="w-full rounded-xl shadow-md object-cover"
  />
  
  {/* My Listing Tag */}
  {user?.email === userEmail && (
    <div className="absolute top-2 right-2 bg-primary text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md shadow">
      My Listing
    </div>
  )}
</div>


        {/* Right Details */}
        <div className='bg-base-200 rounded-xl border border-base-300 p-3 shadow-md'>
          <h2 className="text-xl sm:text-2xl font-bold text-primary animate-left-to-center">
            {propertyName}
          </h2>
          <p className="text-base opacity-80 leading-relaxed animate-right-to-center">
            {description}
          </p>

        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-5 animate-fade-in-center">

              {/* Posted By */}
          <div className=" flex flex-col md:justify-between md:items-center md:flex-row gap-2 mt-6 bg-base-200 rounded-xl p-3 shadow-md border border-base-300 ">
            <div>
               <p className=' font-medium'>Posted by</p>
            </div>
            <div className='flex items-center gap-3'>
                <img
              src={userImage ? userImage : userImg}
              alt="Posted By"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-secondary object-cover"
            />
            <div>
              <p className="font-semibold text-secondary text-base sm:text-lg">
                {userName || "Unknown User"}
              </p>
              <p className="text-sm text-secondary/70">
                {userEmail || "No email available"}
              </p>
            </div>
            </div>
          </div>

          
{/* Info Grid */}
          <div className="grid  grid-cols-1 gap-2 mt-6 bg-base-200 rounded-xl p-3 shadow-md border border-base-300 ">
            <div className='flex flex-col gap-2 md:flex-row justify-between'>
              <div className='flex gap-1 items-center'>
                <p className="font-medium text-base text-secondary/90 flex items-center gap-2">
                  Price:
                </p>
                <span className="font-medium">${price}</span>
              </div>

              <div className='flex gap-1 items-center'>
                <p className="font-medium text-base text-secondary/90 flex items-center gap-2">
                  Category:
                </p>
                <span className="font-medium">{category}</span>
              </div>
            </div>

            <div className='flex flex-col gap-2 md:flex-row justify-between'>
              <div className='flex gap-1 items-center'>
                <FaMapMarkerAlt className="text-lg text-secondary/90 sm:text-xl" />
                <p className="font-medium text-base flex items-center gap-1">
                  {location}
                </p>
              </div>

              <div className='flex gap-1 items-center'>
                <FaCalendarAlt className="text-secondary/90 sm:text-xl" />
                <p className="font-medium text-base flex items-center gap-2">
                  {new Date(created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>


        
      </div>

      {/* Ratings & Reviews Section */}
      <div className="mt-10 bg-base-200 border border-base-300 shadow-md rounded-2xl p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Ratings & Reviews</h3>

        {/* Review Form */}
     {
  user?.email === userEmail || userHasReviewed ? (
    <p className="text-center text-sm md:text-base text-secondary/70 font-medium bg-base-300 py-3 rounded-lg">
      {userHasReviewed
        ? "You have already submitted a review for this property."
        : "You cannot review your own property."}
    </p>
  ) : (
    <form
      onSubmit={handleReviewSubmit}
      className="bg-base-200 p-4 sm:p-6 rounded-xl space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <label className="font-semibold text-secondary">Your Rating:</label>
        <Rating style={{ maxWidth: 160 }} value={rating} onChange={setRating} />
      </div>
      <textarea
        name="reviewText"
        placeholder="Write a short review...max(200 character)"
        maxLength={200}
        className="textarea outline-none w-full h-24 resize-none"
      ></textarea>
      <button type="submit" className="btn btn-primary btn-outline w-full sm:w-auto">
        Submit Review
      </button>
    </form>
  )
}


   {/* Review List */}
{/* Review List */}
<div className="mt-6 space-y-4">
  {reviews.length > 0 ? (
    reviews.map((rev, idx) => (
      <div
        key={idx}
        className="bg-base-200 p-3 sm:p-4 rounded-xl border border-base-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
      >
         <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
             <img
          src={rev.reviewerImage ? rev.reviewerImage : demoImg}
          alt={rev.reviewerName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h4 className="font-semibold text-secondary">{rev.reviewerName}</h4>
          </div>
          <Rating style={{ maxWidth: 120 }} readOnly value={rev.rating} />
          <p className="opacity-80 text-sm mt-1">{rev.reviewText}</p>
        </div>
         </div>

         <div>
              <span className="text-sm flex sm:flex-col flex-row justify-between items-center gap-2 text-secondary/60 mt-1 min-w-[150px] sm:mt-0">
                {new Date(rev.reviewDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
              
            </span>
         </div>

         
      </div>
    ))
  ) : (
    <p className="text-center text-secondary/70">
      {user?.email === userEmail
        ? "You have not received any reviews yet."
        : "No reviews yet. Be the first to review this property!"}
    </p>
  )}
</div>


      </div>
    </div>
  );
};

export default PropertyDetails;
