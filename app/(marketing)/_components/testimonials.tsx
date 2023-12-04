"use client";

import { ReactElement } from "react";

import { motion } from "framer-motion";
import { Testimony, useTestimonial } from "@/hooks/use-testimonial";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const FORWARD = 1;
const BACKWARD = -1;

type TestimonialProps = {
  testimonial: Testimony;
  direction: typeof FORWARD | typeof BACKWARD;
};

function Testimonial({ testimonial, direction }: TestimonialProps): ReactElement {
  return (
    <motion.div
      className="testimonial-item"
      initial={
        direction === FORWARD ? { opacity: 0, x: "100%" } : { opacity: 0, x: "-100%" }
      }
      animate={{ opacity: 1, x: 0 }}
      exit={
        direction === FORWARD ? { opacity: 0, x: "-100%" } : { opacity: 0, x: "100%" }
      }
      transition={{ duration: 0.5 }}
      key={testimonial.id}
    >
      <div>
        <p className="text-lg font-semibold mb-2">{testimonial.name}</p>
        <p className="text-sm text-gray-600">{testimonial.comment}</p>
      </div>
    </motion.div>
  );
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

  const { currentIndex, direction, nextTestimonial, prevTestimonial } =
    useTestimonial(testimonies);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-orange-600">
        Testimonials
      </h2>
      <div className="flex items-center justify-center mb-4">
        <Button
          variant="link"
          onClick={prevTestimonial}
          className="mr-4"
        >
          <ChevronLeft className="h-10 w-10" />
        </Button>
        <motion.div
          className={`testimonial-container shadow-xl rounded-xl p-8 bg-gray-200 font-bold relative ${"sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2"} ${"overflow-hidden sm:max-h-96 md:max-h-80 lg:max-h-64 xl:max-h-56"}`}
        >
          <Testimonial
            testimonial={testimonies[currentIndex]}
            direction={direction}
          />
        </motion.div>
        <Button
          variant="link"
          onClick={nextTestimonial}
          className="ml-4"
        >
          <ChevronRight className="h-10 w-10" />
        </Button>
      </div>
    </div>
  );
}

export default Testimonials;
