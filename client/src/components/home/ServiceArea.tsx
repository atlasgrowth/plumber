
import { Phone } from "lucide-react";
import { Button } from "../ui/button";

interface ServiceAreaProps {
  businessName: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
}

export function ServiceArea({ 
  businessName,
  phone,
}: ServiceAreaProps) {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Contact Us
        </h2>
        <div className="text-center">
          {phone && (
            <Button size="lg" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-xl font-bold mb-4" asChild>
              <a href={`tel:${phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                Call Now: {phone}
              </a>
            </Button>
          )}
          <p className="text-white mt-4">
            Serving your local area with 24/7 emergency plumbing services
          </p>
        </div>
      </div>
    </section>
  );
}
