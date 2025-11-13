import React from "react";

export default function FeaturedLocations() {
  const locations = [
    {
      name: "Dhaka",
      properties: "120+ Properties",
      image:
        "https://images.unsplash.com/photo-1593759607740-89b6fa70c7e3?w=800&q=80",
    },
    {
      name: "Chattogram",
      properties: "85+ Properties",
      image:
        "https://images.unsplash.com/photo-1625011183043-25136d5fcb9f?w=800&q=80",
    },
    {
      name: "Sylhet",
      properties: "60+ Properties",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-6xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary">
          Featured Locations
        </h2>
        <p className="text-secondary text-lg">
          Explore the most popular cities with verified listings for your next
          dream property.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="overflow-hidden shadow-lg rounded-2xl hover:scale-[1.03] transition-all duration-300 relative"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                <h3 className="text-2xl font-semibold">{loc.name}</h3>
                <p className="text-sm">{loc.properties}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
