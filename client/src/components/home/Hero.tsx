
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeroProps {
  businessName: string;
  phone?: string;
  city?: string;
  is24_7?: boolean;
}

const titleVariations = [
  "Professional Plumbing Services",
  "Expert Plumbing Solutions", 
  "Quality Plumbing Services"
];

export function Hero({ businessName, phone, city, is24_7 }: HeroProps) {
  const randomTitle = titleVariations[Math.floor(Math.random() * titleVariations.length)];
  const locationText = city ? ` in ${city}, Arkansas` : "";

  return (
    <div className="relative bg-gradient-to-b from-primary/5 to-background min-h-[600px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {randomTitle}{locationText}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {businessName} provides expert plumbing solutions for residential and commercial properties.
            {is24_7 && " Available 24/7 for emergencies."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/residential">View Services</Link>
            </Button>
            {phone && (
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${phone}`}>Call Now: {phone}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
