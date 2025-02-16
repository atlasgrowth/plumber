import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Clock } from "lucide-react";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout businessData={businessData}>
      {/* Keep the new hero section */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">Residential Plumbing Services</h1>
              <p className="text-xl mb-8">Professional plumbing solutions for your home, delivered with expertise and care.</p>
              {businessData?.basic_info?.phone && (
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call {businessData.basic_info.phone}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Your preferred design for the services section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Installation Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><Wrench className="mr-2 h-4 w-4 text-primary" /> Water Heater Installation</li>
              <li className="flex items-center"><Wrench className="mr-2 h-4 w-4 text-primary" /> Pipe Installation</li>
              <li className="flex items-center"><Wrench className="mr-2 h-4 w-4 text-primary" /> Fixture Installation</li>
              <li className="flex items-center"><Wrench className="mr-2 h-4 w-4 text-primary" /> Bathroom Remodeling</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Repair Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Leak Detection & Repair</li>
              <li className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Drain Cleaning</li>
              <li className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Pipe Repair</li>
              <li className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Fixture Repair</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Emergency Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> 24/7 Emergency Response</li>
              <li className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Burst Pipe Repair</li>
              <li className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Emergency Water Shutdown</li>
              <li className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> Flood Control</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Request Service</h2>
          <div className="max-w-xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}