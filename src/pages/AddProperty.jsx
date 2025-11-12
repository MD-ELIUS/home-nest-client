import React, { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import usePageTitle from "../hooks/usePageTitle";


const MySwal = withReactContent(Swal);

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure() ;

  usePageTitle("Add Property | HomeNest Real Estate");

 

  const handleSubmit =  (e) => {
    e.preventDefault();

    const propertyName = e.target.propertyName.value ;
    const description = e.target.description.value ;
    const category = e.target.category.value ;
    const price = e.target.price.value ;
    const location = e.target.location.value ;
    const imageUrl = e.target.imageUrl.value ;
    const userEmail = e.target.email.value ;
    const userName = e.target.name.value ;
    const userImage = user.photoURL

const newProperty = {
    propertyName, 
    description,
    category,
    price,
    location,
    imageUrl,
    userEmail,
    userName,
    userImage,
    created_at: new Date().toISOString()
}

     axiosSecure.post("http://localhost:5205/properties", newProperty)
       .then(data => {
        console.log('successfull data', data.data)
        if(data.data.insertedId) {
             Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your bid has been placed successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
         
                
        }
    })
    
  };

  return (

      

       <div className="flex justify-center items-center min-h-screen bg-base-200 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="w-11/12 mx-auto max-w-3xl bg-base-200  shadow-xl p-6 border border-base-300 rounded-2xl animate-fade-in-center ">
          <h2 className="text-center text-2xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-5 md:mb-7 text-secondary">
          Add <span className="text-primary">Property</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property Name */}
          <div>
            <label className="label font-semibold">Property Name</label>
            <input
              type="text"
              name="propertyName"
              
              required
              placeholder="Enter property name"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold">Description(Upto 1000 Character)</label>
            <textarea
              name="description"
              required
              maxLength={1000}
              placeholder="Enter property description"
              className="textarea w-full bg-base-200 focus:outline-none focus:ring-0 h-24"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="label font-semibold">Category</label>
            <select
              name="category"
              className="select w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Commercial</option>
              <option>Land</option>
              
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="label font-semibold">Price (BDT)</label>
            <input
              type="number"
              name="price"
              
              required
              placeholder="Enter price in BDT"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold">Location</label>
            <input
              type="text"
              name="location"
              
              required
              placeholder="City, Area or Address"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="label font-semibold">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              
              placeholder="Enter image link"
              className="input w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label font-semibold">Your Email</label>
              <input
                type="email"
                name="email"
                value={
                     user?.email
                }
                required
                readOnly
                className="input w-full bg-base-200 text-secondary h-12 cursor-not-allowed font-medium"
              />
            </div>
            <div>
              <label className="label font-semibold">Your Name</label>
              <input
                type="text"
                name="name"
                value={
                     user?.displayName
                }
                required
                readOnly
                className="input w-full bg-base-200 text-secondary h-12 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-outline w-full mt-2"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
    


   
  );
};

export default AddProperty;
