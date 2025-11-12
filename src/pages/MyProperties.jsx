import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";
import { Link, useNavigate } from "react-router";
import LoadingData from "../Loader/LoadingData";
import usePageTitle from "../hooks/usePageTitle";

const MySwal = withReactContent(Swal);

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const navigate = useNavigate();


   usePageTitle("My Property | HomeNest Real Estate");

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5205/properties?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setProperties(data);
        })
        .catch((err) => {
          console.error(err);
          MySwal.fire("Error!", "Failed to fetch properties.", "error");
        });
    }
  }, [user?.email]);

  // Delete Property
  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/properties/${id}`);
          await axiosSecure.delete(`/reviews?propertyId=${id}`);
          setProperties(properties.filter((p) => p._id !== id));
          MySwal.fire("Deleted!", "Property has been deleted.", "success");
        } catch (error) {
          console.error(error);
          MySwal.fire("Error!", "Failed to delete property.", "error");
        }
      }
    });
  };

  // Open Update Modal
  const handleUpdateClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  // Update Submit (Same structure as MyProducts)
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    

    const id = selectedProperty._id;

    const updatedProperty = {
      propertyName: event.target.propertyName.value,
      description: event.target.description.value,
      category: event.target.category.value,
      price: event.target.price.value,
      location: event.target.location.value,
      imageUrl: event.target.imageUrl.value,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user.photoURL,
      updated_at: new Date(),
      

      
    };

    try {
      const res = await axiosSecure.patch(`/properties/${id}`, updatedProperty);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Property updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

         navigate(`/property-details/${id}`, { state: updatedProperty });

        setProperties((prev) =>
          prev.map((p) => (p._id === id ? { ...p, ...updatedProperty } : p))
        );
        setIsModalOpen(false);
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          text: "You didn’t modify any field.",
        });
      }
    } catch (err) {
      console.error("❌ Update Error:", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 space-y-6 bg-base-100">
      {loading ? (
        <LoadingData />
      ) : (
        <>
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-7 text-secondary">
            My <span className="text-primary">Properties</span>{" "}
            <span className="text-primary">({properties.length})</span>
          </h2>

          {properties.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-10">
              You have not added any property yet.
            </p>
          ) : (
            <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-base-200  border border-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-left-to-center"
                >
                  <img
                    src={property.imageUrl}
                    alt={property.propertyName}
                    className="w-full h-44 sm:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-5 space-y-1 sm:space-y-2 animate-fade-in-center">
                    <h2 className="text-lg sm:text-xl font-semibold text-primary dark:text-primary truncate ">
                      {property.propertyName}
                    </h2>
                    <p className=" text-sm font-medium">
                      <span className="text-secondary">Category: </span> {property.category}
                    </p>
                    <p className=" text-sm font-medium">
                      <span className="text-secondary">Price: </span> {property.price}
                    </p>
                    <p className=" text-sm font-medium">
                      <span className="text-secondary">Location: </span> {property.location}
                    </p>
                    <p className=" text-sm font-medium">
                      <span className="text-secondary">Posted:{" "} </span>
                      {new Date(property.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <div className="flex flex-col md:flex-row gap-2 mt-3">
                      <button
                        onClick={() => handleUpdateClick(property)}
                        className="w-full sm:flex-1 btn btn-outline btn-success animate-fade-in-center"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="w-full sm:flex-1 btn btn-outline btn-error animate-fade-in-center"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/property-details/${property._id}`}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="w-full sm:flex-1 btn btn-outline btn-primary animate-fade-in-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ✅ Update Modal (Copied & Styled Like MyProducts) */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-transparent backdrop-blur-sm py-10">
          <div className="bg-base-100 rounded-2xl shadow-lg w-full max-w-2xl p-8 border border-base-100 relative my-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-secondary mb-6">
              Update <span className="text-primary">Property</span>
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    defaultValue={selectedProperty.propertyName}
                    className="w-full input outline-none "
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Category
                  </label>
                   <select
              name="category"
              defaultValue={selectedProperty.category}
              className="select w-full bg-base-200 h-12 focus:outline-none focus:ring-0"
            >
              <option>Rent</option>
              <option>Sale</option>
              <option>Commercial</option>
              <option>Land</option>
              
            </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={selectedProperty.price}
                    className="w-full input outline-none "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedProperty.location}
                    className="w-full input outline-none "
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={selectedProperty.imageUrl}
                  className="w-full input outline-none "
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description(Upto 1000 Character)
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedProperty.description}
                   maxLength={1000}
                  className="w-full textarea outline-none h-24  "
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    User Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={user?.displayName}
                    className="w-full input outline-none bg-base-200 text-secondary  cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    User Email
                  </label>
                  <input
                    type="email"
                    readOnly
                    defaultValue={user?.email}
                    className="w-full input outline-none  bg-base-200 text-secondary cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-primary text-primary font-medium py-2 px-5 rounded-lg hover:bg-primary/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold py-2 px-5 rounded-lg hover:opacity-90 transition"
                >
                  Update Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
