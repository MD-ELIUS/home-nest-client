import React, { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import userImg from "../assets/avatar.png";
import { AuthContext } from "../provider/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const {
    displayName,
    email,
    photoURL,
    metadata: { creationTime, lastSignInTime },
  } = user;

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // 🔥 realtime UI update
      setUser({
        ...user,
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)]  py-10">
      <div className="w-11/12 md:w-full mx-auto">
        {/* ================= HEADER ================= */}
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
          My <span className="text-primary">Profile</span>
        </h1>

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6  flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center ">
            <img
              src={photoURL || userImg}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-primary object-cover"
            />
            <button
              onClick={() => setOpen(true)}
              className="btn btn-outline btn-primary mt-4"
            >
              Edit Profile
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <ProfileItem label="Full Name" value={displayName || "N/A"} />
            <ProfileItem label="Email" value={email} />
            <ProfileItem
              label="Account Created"
              value={new Date(creationTime).toLocaleString()}
            />
            <ProfileItem
              label="Last Login"
              value={new Date(lastSignInTime).toLocaleString()}
            />
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-base-100 rounded-2xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-xl text-secondary"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-secondary text-center">
              Edit <span className="text-primary">Profile</span>
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  name="name"
                  defaultValue={displayName}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Photo URL</label>
                <input
                  name="photo"
                  defaultValue={photoURL}
                  className="input input-bordered w-full"
                />
              </div>

              <button
                disabled={loading}
                className="btn btn-primary w-full mt-4"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE ITEM ================= */
const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span className="md:w-48 font-semibold text-secondary">{label}:</span>
    <span className="text-secondary/80 break-all">{value}</span>
  </div>
);

export default Profile;
