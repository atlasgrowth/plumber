
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Review {
  text: string;
  reviewer_name: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
}

export function ReviewsSection({ reviews = [] }: ReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-white">What Our Customers Say</h2>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="flex justify-center items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg text-gray-600">
            Based on {reviews.length} reviews
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={prevReview}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={nextReview}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="overflow-hidden relative min-h-[300px]">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute w-full transition-transform duration-500 ${
                  index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`
                }}
              >
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Quote className="h-8 w-8 text-primary/20 mb-4 mx-auto" />
                    <p className="text-lg mb-6">{review.text}</p>
                    <div className="flex flex-col items-center">
                      <p className="font-semibold text-lg">{review.reviewer_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            asChild
          >
            <a href={`https://www.google.com/maps/place/?q=place_id=${businessData?.place_id}`} 
               target="_blank" 
               rel="noopener noreferrer"
            >
              Read More Reviews
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
