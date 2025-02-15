import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const residentialServices = [
    {
      title: "Installation Services",
      description: "Professional installation of plumbing fixtures and systems",
      features: [
        "Water heater installation",
        "Pipe installation",
        "Fixture installation",
        "New construction plumbing"
      ]
    },
    {
      title: "Repair Services",
      description: "Quick and reliable repair solutions",
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
      <div className="pt-16 pb-8 bg-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Residential Plumbing Services
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Professional plumbing solutions for your home, backed by years of experience
            and expert knowledge.
          </p>
        </div>
      </div>

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
