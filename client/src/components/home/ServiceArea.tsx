import { MapPin } from "lucide-react";

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
}: ServiceAreaProps) {
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=11&size=800x400&markers=color:red%7C${latitude},${longitude}&key=AIzaSyBopOp_cVJCHyJGNdAJD7GDVbpbJpAYhfE`;

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Service Area
        </h2>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={staticMapUrl} 
            alt="Service Area Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}