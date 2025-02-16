
import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const residentialServices = [
    {
      title: "Installation Services",
      description: "Expert installation for all your plumbing needs",
      features: [
        "Water heater installation",
        "Pipe installation",
        "Fixture installation",
        "New construction plumbing"
      ]
    },
    {
      title: "Repair Services",
      description: "Fast and reliable repair solutions",
      features: [
        "Leak repairs",
        "Drain cleaning",
        "Fixture repairs",
        "Pipe repairs"
      ]
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency plumbing solutions",
      features: [
        "Burst pipe repairs",
        "Emergency leak fixes",
        "Water heater emergencies",
        "Blocked drain clearing"
      ]
    }
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
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Residential Plumbing Services
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Professional plumbing solutions for your home, backed by years of experience and expert knowledge.
          </p>
          {businessData?.basic_info?.phone && (
            <div className="flex justify-center">
              <Button size="lg" asChild className="gap-2">
                <a href={`tel:${businessData.basic_info.phone}`}>
                  <Phone className="h-5 w-5" />
                  Call Now: {businessData.basic_info.phone}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {residentialServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">Licensed & Insured</h3>
                <p className="text-gray-600">Fully licensed professionals you can trust with your home.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">24/7 Availability</h3>
                <p className="text-gray-600">Emergency services available whenever you need them.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
                <p className="text-gray-600">Competitive rates with no hidden fees or surprises.</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Request Service
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
