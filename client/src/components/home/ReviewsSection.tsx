import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
}

export function ReviewsSection({ reviews = [] }: ReviewsSectionProps) {
  const defaultReviews = [
    {
      author: "John D.",
      rating: 5,
      text: "Excellent service! Very professional and prompt."
    },
    {
      author: "Sarah M.",
      rating: 5,
      text: "Great experience from start to finish. Highly recommend!"
    }
  ];

  const displayReviews = reviews.length ? reviews : defaultReviews;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayReviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <p className="font-semibold">{review.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
