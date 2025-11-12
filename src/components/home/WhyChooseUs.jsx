// WhyChooseUs.jsx
import { ShieldCheck, Handshake, Users } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Trusted & Secure",
      description:
        "We ensure every property listing is verified and transparent, giving you complete confidence in your buying or renting decisions.",
      animation: "animate-left-to-center",
    },
  
    {
      icon: <Handshake className="w-10 h-10 text-primary" />,
      title: "Seamless Experience",
      description:
        "Our modern interface ensures a smooth browsing experience, making property discovery easier than ever.",
      animation: "animate-fade-in-center",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Community Focused",
      description:
        "We connect genuine buyers, sellers, and agents to create a trustworthy real estate community built on honesty and care.",
      animation: "animate-right-to-center",
    },
  ];

  return (
    <section className="pb-6 md:pb-8 lg:pb-10  bg-base-100 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-center text-3xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 text-secondary leading-tight">
        Why <span className="text-primary">Choose Us?</span>
        </h2>
        {/* <h2 className="text-3xl sm:text-4xl font-bold mb-8 animate-fade-in-center">
          Why Choose Us?
        </h2> */}
        <p className="text-base sm:text-lg opacity-80  max-w-3xl mx-auto mb-5 animate-fade-in-center">
          We are committed to helping you find your dream property — with verified
          listings, modern design, and top-notch service.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`card bg-base-200 shadow-md hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 border border-base-300 rounded-2xl p-6 ${item.animation}`}
            >
              <div className="flex flex-col items-center space-y-4">
                {item.icon}
                <h3 className="text-lg sm:text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-secondary/80 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
