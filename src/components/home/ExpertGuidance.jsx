import React from "react";
import { motion } from "framer-motion";

const experts = [
  {
    id: 1,
    name: "John Doe",
    title: "Property Consultant",
    img: "https://png.pngtree.com/png-vector/20230930/ourmid/pngtree-auction-realtor-mortgage-png-image_10155052.png",
    blurb:
      "Specializes in residential properties, helping clients find their dream home quickly.",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Real Estate Advisor",
    img: "https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-smiling-realtor-hold-house-miniature-and-key-png-image_10117516.png",
    blurb:
      "Provides expert guidance on buying and selling commercial real estate efficiently.",
  },
 {
    id: 3,
    name: "Jahid Alam",
    title: "Property Manager",
    img: "https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-real-estate-man-white-background-copy-png-image_11729844.png",
    blurb: "Manages properties efficiently, ensuring smooth operations and tenant satisfaction."
  },
   {
    id: 4,
    name: "Ali Khan",
    title: "Investment Consultant",
    img: "https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-real-estate-agent-transparent-background-png-image_10613803.png",
    blurb:
      "Helps investors make smart property decisions with detailed market insights.",
  },
];

export default function ExpertGuidance() {
  return (
    <section className="pb-6 md:pb-8 lg:pb-10   w-11/12 mx-auto ">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{delay: 0.2, duration: 0.9 }}
        className="text-center text-3xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-3 text-primary leading-tight"
      >
       <span className="text-secondary">Our </span> Experts
      </motion.h2>

      <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9 }}
                className="text-base text-secondary sm:text-lg opacity-80 text-center  max-w-xl md:max-w-3xl mx-auto mb-5 "
              >

    Connect with our trusted consultants for vetted property advice — whether
        you are buying, selling, or renting. Quick calls, tailored reports, and
        on-the-ground support.

              </motion.p>

       
           
        

      {/* <p className="max-w-3xl mx-auto text-center text-secondary/80 mb-10">
       
      </p> */}

      <div className="bg-base-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {experts.map((ex, i) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: i * 0.3, duration: 1 }}
            className="bg-base-200  border border-base-300  shadow-md hover:shadow-xl transition p-6 rounded-2xl flex flex-col items-center text-center"
          >
            <div className="h-25 w-25 mb-3 rounded-full overflow-hidden border-2 border-secondary">
              <img
                src={ex.img}
                alt={ex.name}
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl text-primary font-semibold ">{ex.name}</h3>
            <p className="font-medium text-lg opacity-90 mb-3">{ex.title}</p>
            <p className="opacity-80 text-base leading-relaxed">{ex.blurb}</p>

            <button className="mt-4 btn w-full md:w-auto btn-primary btn-outline transition">
              Request Callback
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
