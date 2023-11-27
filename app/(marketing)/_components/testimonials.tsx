"use client";

import React, { ReactElement, useState } from "react";

import { motion } from "framer-motion";

interface Testimony {
  id: number;
  name: string;
  comment: string;
}

function Testimonials(): ReactElement {
  const testimonies: Testimony[] = [
    {
      id: 1,
      name: "John Doe",
      comment:
        "TaskManagement is fantastic! It simplifies task organization and collaboration. The interface is intuitive, and the team loves it!",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment:
        "I've found TaskManagement incredibly useful. It's user-friendly and has boosted our team's productivity significantly.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      comment:
        "As a freelancer, TaskManagement keeps me on track with its easy-to-use features. Highly recommended for personal use!",
    },
    {
      id: 4,
      name: "Michael Brown",
      comment:
        "TaskManagement has become an essential tool for our team. It's user-friendly and has improved our project management.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1: forward, -1: backward

  const nextTestimonial: () => void = (): void => {
    setCurrentIndex((prevIndex: number): number => (prevIndex + 1) % testimonies.length);
    setDirection(1);
  };

  const prevTestimonial: () => void = (): void => {
    setCurrentIndex((prevIndex: number): number =>
      prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1
    );
    setDirection(-1);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-orange-600">
        Testimonials
      </h2>
      <div className="flex items-center justify-center mb-4">
        <button
          className="arrow arrow-left"
          onClick={prevTestimonial}
          style={{ marginRight: "16px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <motion.div
          className="testimonial-container shadow-xl rounded-xl p-8 bg-gray-200 font-bold overflow-hidden relative"
          style={{ width: "900px", height: "150px" }}
        >
          <motion.div
            className="testimonial-item"
            initial={
              direction === 1 ? { opacity: 0, x: "100%" } : { opacity: 0, x: "-100%" }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              direction === 1 ? { opacity: 0, x: "-100%" } : { opacity: 0, x: "100%" }
            }
            transition={{ duration: 0.5 }}
            key={testimonies[currentIndex].id}
          >
            <div>
              <p className="text-lg font-semibold mb-2">
                {testimonies[currentIndex].name}
              </p>
              <p className="text-sm text-gray-600">{testimonies[currentIndex].comment}</p>
            </div>
          </motion.div>
        </motion.div>
        <button
          className="arrow arrow-right"
          onClick={nextTestimonial}
          style={{ marginLeft: "16px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Testimonials;
