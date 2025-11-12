import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import usePageTitle from '../hooks/usePageTitle';
import { AuthContext } from '../provider/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import userImg from ".././assets/avatar.png";
import { FaMoneyBillWave, FaMapMarkerAlt, FaTags, FaCalendarAlt } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  usePageTitle('Property Details | HomeNest Real Estate');

  useEffect(() => {
    if (user?.email && user?.accessToken && id) {
      axiosSecure
        .get(`/properties/${id}`)
        .then((data) => setProperty(data.data))
        .catch((err) => console.error('Error fetching property:', err));
    }
  }, [id, user, axiosSecure]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;

    const newReview = {
      name: user?.displayName || 'Anonymous User',
      photo: user?.photoURL || 'https://i.ibb.co/4mDPWxt/user.png',
      rating,
      review: reviewText,
      date: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setReviewText('');
  };

  if (!property) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
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
    userImage
  } = property;

  return (
    <div className="w-11/12 mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-10 ">
      {/* Property Card */}
    <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-5 animate-fade-in-center">
    {/* Left Image */}
    <div className="  ">
      <img
        src={imageUrl || 'https://i.ibb.co/5RHR6QZ/placeholder-image.jpg'}
        alt={propertyName}
        className="w-full rounded-xl  object-cover"
      />
      
    </div>

    {/* Right Details */}
    <div className=" ">
      <h2 className="text-xl sm:text-2xl font-bold text-primary animate-left-to-center">
        {propertyName}
      </h2>
      <p className="text-lg  leading-relaxed font-medium animate-right-to-center">
        {description}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-2 mt-4">

        <div className='flex flex-col gap-2  md:flex-row justify-between'>

            <div className='flex gap-1 items-center'>
                 <p className="font-medium text-base text-secondary/90  flex items-center gap-2">
            Price: 
        </p>
        <span className=" font-medium">${price}</span>
            </div>

             <div className='flex gap-1 items-center'>
                 <p className="font-medium text-base text-secondary/90  flex items-center gap-2">
            Category:
        </p>
        <span className=" font-medium">{category}</span>
            </div>

        

        </div>
       
    <div className='flex flex-col gap-2 md:flex-row justify-between'>

<div className='flex gap-1 items-center'>
     <FaMapMarkerAlt className=" text-lg text-secondary/90 sm:text-xl" />
        <p className="font-medium text-base  flex items-center gap-1">
         
          {location}
        </p>
</div>
       
       <div className='flex gap-1 items-center'>
           <FaCalendarAlt className=" text-secondary/90 sm:text-xl" />
            <p className="font-medium text-base  flex items-center gap-2">
            {new Date(created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
         
        </p>
       </div>

           
    </div>
           
      </div>

      {/* Posted By */}
      <div className="flex items-center gap-3 mt-6 bg-base-200 rounded-xl p-3 shadow-sm">
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
  </div>

      {/* Ratings & Reviews Section */}
      <div className="mt-10 bg-base-100 border border-base-300 shadow-md rounded-2xl p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">Ratings & Reviews</h3>

        {/* Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="bg-base-200 p-4 sm:p-6 rounded-xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="font-semibold text-secondary">Your Rating:</label>
            <Rating
              style={{ maxWidth: 160 }}
              value={rating}
              onChange={setRating}
            />
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a short review..."
            className="textarea outline-none  w-full h-24 resize-none"
          />
          <button type="submit" className="btn btn-primary btn-outline w-full sm:w-auto">
            Submit Review
          </button>
        </form>

        {/* Review List */}
        <div className="mt-6 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-base-200 p-3 sm:p-4 rounded-xl border border-base-300 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
              >
                <img
                  src={rev.photo}
                  alt={rev.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h4 className="font-semibold text-secondary">{rev.name}</h4>
                    <span className="text-sm text-secondary/60 mt-1 sm:mt-0">
                      {new Date(rev.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Rating style={{ maxWidth: 120 }} readOnly value={rev.rating} />
                  <p className="text-secondary/80 mt-1">{rev.review}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary/70">
              No reviews yet. Be the first to review this property!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
