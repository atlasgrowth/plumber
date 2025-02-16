import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Phone, MapPin } from "lucide-react";

interface AboutSectionProps {
  businessName: string;
}

export function AboutSection({ businessName, phone, city }: AboutSectionProps & { phone?: string, city?: string }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" 
              alt="About Us"
              className="rounded-lg shadow-lg w-full object-cover aspect-video"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">About {businessName}</h2>
            <p className="text-gray-600 mb-6">
              With years of experience serving {city || 'the local community'}, {businessName} is your trusted partner for all plumbing needs. We pride ourselves on delivering exceptional service with a focus on quality, reliability, and customer satisfaction.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>24/7 Emergency Service</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{phone}</span>
                </div>
              )}
              {city && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Serving {city} and surrounding areas</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
