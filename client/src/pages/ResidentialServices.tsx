
import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Shield, Clock, CheckCircle2 } from "lucide-react";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const residentialServices = [
    {
      title: "Installation Services",
      description: "Expert installation for all your plumbing needs",
      icon: <Wrench className="w-12 h-12 text-primary mb-4" />,
      features: [
        "Water heater installation & replacement",
        "Complete pipe system installation",
        "Modern fixture installation & upgrades",
        "New construction plumbing systems",
        "Bathroom & kitchen remodeling",
        "Water filtration system setup"
      ]
    },
    {
      title: "Repair Services",
      description: "Fast and reliable repair solutions",
      icon: <Wrench className="w-12 h-12 text-primary mb-4" />,
      features: [
        "Emergency leak detection & repair",
        "Advanced drain cleaning services",
        "Fixture repairs & maintenance",
        "Pipe repair & replacement",
        "Sewer line repair services",
        "Water pressure issue resolution"
      ]
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency plumbing solutions",
      icon: <Shield className="w-12 h-12 text-primary mb-4" />,
      features: [
        "24/7 rapid response team",
        "Emergency burst pipe repairs",
        "Urgent leak containment",
        "Water heater emergencies",
        "Severe drain blockage clearing",
        "Flooding prevention & control"
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
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Residential Plumbing Services
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            Professional plumbing solutions for your home, backed by years of experience and expert knowledge.
          </p>
          {businessData?.basic_info?.phone && (
            <div className="flex justify-center">
              <Button size="lg" asChild className="gap-2 shadow-lg hover:shadow-xl transition-all">
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
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex flex-col items-center text-center mb-6">
                  {service.icon}
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Licensed & Insured</h3>
                </div>
                <p className="text-gray-600">Fully licensed professionals you can trust with your home.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">24/7 Availability</h3>
                </div>
                <p className="text-gray-600">Emergency services available whenever you need them.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Fair Pricing</h3>
                </div>
                <p className="text-gray-600">Competitive rates with no hidden fees or surprises.</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
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
