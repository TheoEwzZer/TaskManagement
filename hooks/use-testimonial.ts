import { useState } from "react";

const FORWARD = 1;
const BACKWARD = -1;

export interface Testimony {
  id: number;
  name: string;
  comment: string;
}

export interface UseTestimonialOutput {
  currentIndex: number;
  direction: typeof FORWARD | typeof BACKWARD;
  nextTestimonial: () => void;
  prevTestimonial: () => void;
}

export function useTestimonial(testimonies: Testimony[]): UseTestimonialOutput {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<typeof FORWARD | typeof BACKWARD>(FORWARD);

  const nextTestimonial: () => void = (): void => {
    setCurrentIndex((prevIndex: number): number => (prevIndex + 1) % testimonies.length);
    setDirection(FORWARD);
  };

  const prevTestimonial: () => void = (): void => {
    setCurrentIndex((prevIndex: number): number =>
      prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1
    );
    setDirection(BACKWARD);
  };

  return { currentIndex, direction, nextTestimonial, prevTestimonial };
}
