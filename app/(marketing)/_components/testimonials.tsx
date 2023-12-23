"use client";

import { ReactElement } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface Testimony {
  name: string;
  comment: string;
}
function Testimonials(): ReactElement {
  const testimonies: Testimony[] = [
    {
      name: "John Doe",
      comment: `
        TaskManagement is fantastic! 
        It simplifies task organization and collaboration. 
        The interface is intuitive, and the team loves it!
      `,
    },
    {
      name: "Jane Smith",
      comment: `
      I've found TaskManagement incredibly useful.
      It's user-friendly and has boosted our team's productivity significantly.`,
    },
    {
      name: "Emily Johnson",
      comment: `
      As a freelancer, TaskManagement keeps me on track with its easy-to-use features.
      Highly recommended for personal use!`,
    },
    {
      name: "Michael Brown",
      comment: `
      TaskManagement has become an essential tool for our team.
      It's user-friendly and has improved our project management.`,
    },
  ];

  return (
    <div className="bg-white py-12">
      <h2 className="mb-8 text-center text-4xl font-extrabold text-orange-600">
        Testimonials
      </h2>
      <div className="flex w-full items-center justify-center">
        <Carousel
          className="w-full max-w-screen-md"
          opts={{ loop: true }}
          plugins={[WheelGesturesPlugin(), Autoplay({ delay: 4000 })]}
        >
          <CarouselContent>
            {testimonies.map(
              (testimony: Testimony, index: number): ReactElement => (
                <CarouselItem key={index}>
                  <div className="px-8">
                    <Card
                      className="
                        testimonial-container
                        relative overflow-hidden 
                        rounded-xl 
                      bg-gray-200 
                        p-4 
                        font-bold 
                        sm:max-h-96 
                        sm:w-full 
                        md:max-h-80
                        lg:max-h-64 
                        xl:max-h-56
                      "
                    >
                      <CardContent>
                        <div>
                          <p className="mb-2 text-lg font-semibold text-gray-700">
                            {testimony.name}
                          </p>
                          <p className="text-sm text-gray-600">{testimony.comment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;
