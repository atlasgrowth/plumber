import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";
import { useRef } from "react";

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
  const mapRef = useRef<HTMLDivElement>(null);

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=11&size=800x400&markers=color:red%7C${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

  const serviceLocations = [
    { name: "Primary Service Area", distance: "Within 15 miles" },
    { name: "Extended Service Area", distance: "15-25 miles" }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Service Area
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{businessName}</h3>
                    {address && <p className="text-gray-600 mb-4">{address}</p>}
                    {phone && (
                      <div className="flex items-center gap-2 mb-4">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
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
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Service Coverage</h3>
                    <div className="space-y-4">
                      {serviceLocations.map((location) => (
                        <div key={location.name} className="flex flex-col">
                          <span className="font-medium">{location.name}</span>
                          <span className="text-sm text-gray-500">{location.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="aspect-square md:aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg min-h-[400px]">
            <img 
              src={staticMapUrl} 
              alt="Service Area Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}