
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
    <div 
      className="relative min-h-[600px] flex items-center"
      style={{
        backgroundImage: 'url("https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white relative z-10 text-shadow">
            {randomTitle}{locationText}
          </h1>
          <p className="text-xl text-white mb-8 relative z-10 text-shadow">
            {businessName} provides expert plumbing solutions for residential and commercial properties.
            {is24_7 && " Available 24/7 for emergencies."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/residential">View Services</Link>
            </Button>
            {phone && (
              <Button size="lg" variant="primary" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href={`tel:${phone}`}>Call Now: {phone}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
