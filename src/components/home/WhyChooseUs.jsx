// WhyChooseUs.jsx
import React from "react";
import { ShieldCheck, Handshake, Users, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Trusted & Secure",
      description:
        "We ensure every property listing is verified and transparent, giving you complete confidence in your buying or renting decisions.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-primary" />,
      title: "Seamless Experience",
      description:
        "Our modern interface ensures a smooth browsing experience, making property discovery easier than ever.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Community Focused",
      description:
        "We connect genuine buyers, sellers, and agents to create a trustworthy real estate community built on honesty and care.",
    },
    {
      icon: <Compass className="w-10 h-10 text-primary" />,
      title: "Expert Guidance",
      description:
        "Our professional agents and advisors are here to guide you every step of the way, ensuring smart and secure property investments.",
    },
  ];

  return (
    <section className="pb-8 md:pb-8 lg:pb-10 bg-base-100">
      <div className="w-11/12 mx-auto text-center">
        {/* Animated Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{delay: 0.2, duration: 0.9 }}
          className="text-center text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 text-secondary leading-tight"
        >
          Why <span className="text-primary">Choose Us?</span>
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-base text-secondary sm:text-lg opacity-80 max-w-3xl mx-auto mb-5"
        >
          We are committed to helping you find your dream property — with verified
          listings, modern design, and top-notch service.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 border border-base-300 rounded-2xl p-6 flex flex-col items-center space-y-4"
            >
              {item.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="opacity-80 text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
