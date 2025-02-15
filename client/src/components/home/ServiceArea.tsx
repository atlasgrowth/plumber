import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface ServiceAreaProps {
  businessName: string;
  address?: string;
}

export function ServiceArea({ businessName, address }: ServiceAreaProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Service Area
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{businessName}</h3>
                  {address && <p className="text-gray-600 mb-4">{address}</p>}
                  <p className="text-gray-600">
                    Serving all of Arkansas with professional plumbing services.
                    We cover residential and commercial properties in:
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    <li>• Little Rock</li>
                    <li>• North Little Rock</li>
                    <li>• Conway</li>
                    <li>• Benton</li>
                    <li>• Bryant</li>
                    <li>• Hot Springs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653069.0132839068!2d-93.46743830237915!3d34.89979868715496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d29e3f743f2571%3A0x7d25064dd61f972!2sArkansas%2C%20USA!5e0!3m2!1sen!2s!4v1645669155897!5w!3h!4m2!1d-92.373123!2d34.969704"
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
