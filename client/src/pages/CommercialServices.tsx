import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";

export default function CommercialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const commercialServices = [
    {
      title: "Commercial Installation",
      description: "Large-scale plumbing installations for businesses",
      features: [
        "Commercial water heaters",
        "Industrial pipe systems",
        "Restaurant plumbing",
        "Bathroom installations"
      ]
    },
    {
      title: "Commercial Repairs",
      description: "Minimizing downtime with quick repairs",
      features: [
        "Emergency repairs",
        "System maintenance",
        "Leak detection",
        "Drain cleaning"
      ]
    },
    {
      title: "Maintenance & Compliance",
      description: "Regular maintenance and code compliance",
      features: [
        "Scheduled maintenance",
        "Code compliance checks",
        "Safety inspections",
        "Backflow testing"
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
      <div className="pt-16 pb-8 bg-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Commercial Plumbing Services
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Comprehensive plumbing solutions for businesses of all sizes.
            Professional service with minimal disruption to your operations.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {commercialServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Request a Consultation
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
