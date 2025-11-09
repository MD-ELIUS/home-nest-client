import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logoImg from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <div className="w-11/12 mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo + Name */}
        <div className="justify-self-start">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={logoImg}
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 2xl:h-20 2xl:w-20"
            />
            <div className="font-bold ">
              <span className="text-base-content text-[20px] lg:text-[22px] 2xl:text-[24px]">
                Home
              </span>
              <span className="text-primary text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] 2xl:text-[28px]">
                Nest
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base opacity-80 max-w-xs text-secondary">
            Find your perfect property with confidence and comfort — HomeNest connects you to your dream space.
          </p>
        </div>

        {/* Contact Info */}
        <div className="sm:justify-self-end ">
          <h3 className="text-lg font-semibold mb-3 text-primary">Contact Us</h3>
          <ul className="space-y-2 text-sm md:text-base text-secondary">
            <li>Email: <a href="mailto:info@homenest.com" className="hover:text-primary">info@homenest.com</a></li>
            <li>Phone: <a href="tel:+880123456789" className="hover:text-primary">+880 1234 567 890</a></li>
            <li>Address: Barishal, Bangladesh</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="lg:justify-self-end ">
          <h3 className="text-lg font-semibold mb-3 text-primary">Useful Links</h3>
          <ul className="space-y-2 text-sm md:text-base text-secondary">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/all-properties" className="hover:text-primary">All Properties</Link></li>
            <li><Link to="/add-property" className="hover:text-primary">Add Property</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="sm:justify-self-end">
          <h3 className="text-lg font-semibold mb-3 text-primary">Follow Us</h3>
          <div className="flex gap-4 text-secondary">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="btn btn-circle btn-outline btn-sm hover:bg-primary hover:border-primary hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="btn btn-circle btn-outline btn-sm hover:bg-primary hover:border-primary hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"
              className="btn btn-circle btn-outline btn-sm hover:bg-primary hover:border-primary hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="btn btn-circle btn-outline btn-sm hover:bg-primary hover:border-primary hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-base-300 mt-6 py-4 text-center text-sm md:text-base opacity-70">
        © {new Date().getFullYear()} <span className="text-primary font-semibold">HomeNest</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
