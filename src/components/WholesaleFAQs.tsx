'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aos from "aos";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
    {
      question: 'How do I place a bulk order?',
      answer:
        'To place a bulk order, simply select the products you want, choose the quantity, and request Quote. If you need special assistance or have any bulk-specific requirements, please contact our sales team.',
    },
    {
      question: 'What is the minimum order quantity?',
      answer:
        'The minimum order quantity depends on the product category. Please check the product details for each item, or reach out to our customer service for more information.',
    },
    {
      question: 'Can I customize products for bulk orders?',
      answer:
        'Yes, we offer product customization options for bulk orders. Please contact us with your requirements, and our team will guide you through the customization process.',
    },
    {
      question: 'What payment methods do you accept for wholesale orders?',
      answer:
        'We accept a variety of payment methods, including credit/debit cards and bank transfers. For larger orders, we may also offer customized payment plans.',
    },
    {
      question: 'Do you offer free shipping for wholesale orders?',
      answer:
        'Yes, we offer free shipping on bulk orders above a certain threshold. Please check our shipping policy or contact customer support for more details.',
    },
    {
      question: 'What is your return policy for wholesale orders?',
      answer:
        'Wholesale orders are subject to our standard return policy. Please review the terms and conditions for returns. For any concerns with defective or damaged products, we offer replacement or refund options.',
    },
  ];




const WholesaleFAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    useEffect(() => {
      Aos.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
      });
    }, []);
  
  return (
    <section data-aos="fade-left" className="bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16">
      <div data-aos="fade-right" className="max-w-4xl mx-auto text-center mb-10">
        <h2 data-aos="fade-left" className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-blue-600">
        WholeSaleHomeProducts FAQs
        </h2>
        <p  data-aos="fade-down" className="mt-2 text-sm xs:text-base text-gray-600">
        Find answers to common wholesale questions about orders, payments, and shipping.
        </p>
      </div>

      <div data-aos="fade-down" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 xs:p-5 sm:p-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center text-sm xs:text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
            >
              {faq.question}
              <span className="ml-4 text-blue-500 text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm xs:text-base text-gray-700 mt-3">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WholesaleFAQs;