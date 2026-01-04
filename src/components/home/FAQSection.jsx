import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Are all properties on HomeNest verified?",
    answer:
      "Yes. Every property listed on HomeNest is carefully verified by our expert team to ensure authenticity, legal compliance, and accuracy.",
  },
  {
    id: 2,
    question: "How can I contact a property agent?",
    answer:
      "You can contact agents directly from the property details page using call, email, or request options.",
  },
  {
    id: 3,
    question: "Is there any service charge for buyers or renters?",
    answer:
      "Browsing properties is completely free. Any applicable service charges are transparently shown before final confirmation.",
  },
  {
    id: 4,
    question: "Can I schedule a property visit?",
    answer:
      "Yes. You can easily request a visit and our agents will coordinate according to your availability.",
  },
  {
    id: 5,
    question: "Is HomeNest available outside Bangladesh?",
    answer:
      "Currently, HomeNest operates across major cities in Bangladesh with expansion plans underway.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="py-14 bg-base-100">
      <div className="w-11/12 max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
            <h2 className="text-center text-3xl  md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 md:mb-4 text-secondary leading-tight">
          Frequently <span className="text-primary">Asked Questions</span>
        </h2>
          <p className="text-base sm:text-lg opacity-80">
            Everything you need to know about HomeNest.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="w-11/12 mx-auto border border-base-300 rounded-xl overflow-hidden"
              >
                {/* Question (NO layout animation here) */}
                <button
                  onClick={() =>
                    setOpenId(isOpen ? null : faq.id)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-base">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="text-primary"
                  >
                    <ChevronDown size={22} />
                  </motion.span>
                </button>

                {/* Answer (ONLY this part animates smoothly) */}
                {isOpen && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm opacity-80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
