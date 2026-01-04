import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Apartment Buyer",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "HomeNest made my apartment search incredibly easy. Verified listings and professional agents.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Property Investor",
    rating: 4.5,
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Excellent platform for serious investors. Clean UI and reliable property data.",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    role: "Rental Client",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "Very smooth experience from browsing to renting. Highly recommended!",
  },
  {
    id: 4,
    name: "Farhana Akter",
    role: "Home Seller",
    rating: 4.5,
    image: "https://i.pravatar.cc/150?img=52",
    review:
      "Selling my property was hassle-free with HomeNest’s expert guidance.",
  },
];

export default function ClientTestimonials() {
  return (
    <section className="pb-8 md:pb-8 lg:pb-10 bg-base-100 overflow-hidden">
      <div className="w-11/12 mx-auto text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 text-secondary"
        >
          Client <span className="text-primary">Testimonials</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="text-base sm:text-lg opacity-80 max-w-3xl mx-auto"
        >
          Trusted by buyers, renters, and investors across Bangladesh.
        </motion.p>
      </div>

      <Marquee pauseOnHover gradient={false} speed={45} className="py-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="mx-4 w-[300px] sm:w-[340px] flex-shrink-0 border border-base-300 rounded-2xl p-5
              flex flex-col justify-between h-[160px] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Top */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
                />
                <div>
                  <h4 className="font-semibold text-primary">{item.name}</h4>
                  <p className="text-sm opacity-80">{item.role}</p>
                </div>
              </div>

              <Rating style={{ maxWidth: 100 }} value={item.rating} readOnly />
            </div>

            {/* Review */}
            <p className="opacity-80 text-sm leading-snug mt-1 overflow-hidden line-clamp-3">
              “{item.review}”
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
