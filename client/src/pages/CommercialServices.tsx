import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Building2, Wrench, ClipboardCheck, Clock, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommercialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const features = [
    { icon: Building2, title: "Commercial Installation", text: "Expert installation for businesses of all sizes" },
    { icon: Wrench, title: "Repairs & Maintenance", text: "Quick response times and efficient solutions" },
    { icon: ClipboardCheck, title: "Code Compliance", text: "Ensuring all work meets local regulations" },
    { icon: Clock, title: "24/7 Emergency Service", text: "Round-the-clock support when you need it" },
    { icon: ShieldCheck, title: "Licensed & Insured", text: "Full coverage for your peace of mind" },
    { icon: Users, title: "Dedicated Team", text: "Experienced professionals at your service" }
  ];

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout businessData={businessData}>
      <div 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://www.brewercommercialservices.com/wp-content/uploads/2022/01/DSC03144.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white text-center mb-6">
            Commercial Plumbing Solutions
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-2xl mx-auto">
            Professional plumbing services tailored to your business needs
          </p>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Request a Commercial Consultation
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}