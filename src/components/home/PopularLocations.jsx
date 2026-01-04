// PopularLocations.jsx
import React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function PopularLocations() {
  const locations = [
    {
      name: "Dhaka",
      properties: 120,
      icon: <MapPin className="w-10 h-10 text-primary" />,
    },
    {
      name: "Chittagong",
      properties: 80,
      icon: <MapPin className="w-10 h-10 text-primary" />,
    },
    {
      name: "Sylhet",
      properties: 45,
      icon: <MapPin className="w-10 h-10 text-primary" />,
    },
    {
      name: "Khulna",
      properties: 30,
      icon: <MapPin className="w-10 h-10 text-primary" />,
    },
    
  ];

  return (
    <section className="pb-8 md:pb-8 lg:pb-10 ">
      <div className="w-11/12 mx-auto text-center">
        {/* Animated Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-center text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 text-secondary leading-tight"
        >
          Popular <span className="text-primary">Locations</span>
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base text-secondary sm:text-lg opacity-80 max-w-3xl mx-auto mb-5"
        >
          Explore properties in the most sought-after cities across Bangladesh.
        </motion.p>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 1 }}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 border border-base-300 rounded-2xl p-6 flex flex-col items-center space-y-4"
            >
              {loc.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-primary">
                {loc.name}
              </h3>
              <p className="opacity-80 text-base leading-relaxed">
                {loc.properties} properties
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
