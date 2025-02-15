import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";

interface ServiceAreaProps {
  businessName: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
}

export function ServiceArea({ 
  businessName, 
  address,
  latitude = 35.20105, 
  longitude = -92.38043,
  phone
}: ServiceAreaProps) {
  const nearbyCities = [
    {
      name: "Little Rock",
      distance: "Within 30 miles"
    },
    {
      name: "North Little Rock",
      distance: "Within 35 miles"
    },
    {
      name: "Conway",
      distance: "Within 25 miles"
    },
    {
      name: "Benton",
      distance: "Within 40 miles"
    },
    {
      name: "Bryant",
      distance: "Within 45 miles"
    },
    {
      name: "Jacksonville",
      distance: "Within 35 miles"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Service Area
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{businessName}</h3>
                    {address && <p className="text-gray-600 mb-4">{address}</p>}
                    {phone && (
                      <div className="flex items-center gap-2 mb-4">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${phone}`} className="text-primary hover:underline">
                          {phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Areas We Serve</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {nearbyCities.map((city) => (
                        <div key={city.name} className="flex flex-col">
                          <span className="font-medium">{city.name}</span>
                          <span className="text-sm text-gray-500">{city.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&q=${latitude},${longitude}&zoom=11`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}