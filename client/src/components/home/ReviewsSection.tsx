import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
}

export function ReviewsSection({ reviews = [] }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-primary/5 to-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Customer Testimonials</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            {reviews.length >= 10 && (
              <p className="text-lg text-gray-600">
                Based on {reviews.length} reviews
              </p>
            )}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button 
            variant="ghost" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="overflow-hidden relative min-h-96">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-lg mb-6">{review.text}</p>
                    <div className="flex flex-col items-center">
                      <p className="font-semibold text-lg mb-2">{review.author}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsSection;