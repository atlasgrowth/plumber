import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServiceArea } from "@/components/home/ServiceArea";
import { ContactForm } from "@/components/common/ContactForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function Home() {
  const siteId = useSiteId();
  const { data: businessData, isLoading, error } = useBusinessData(siteId);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error || !businessData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Error loading business data
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout businessData={businessData}>
      <Hero
        businessName={businessData.basic_info.name}
        phone={businessData.basic_info.phone}
      />
      <AboutSection businessName={businessData.basic_info.name} />
      <ServicesOverview services={businessData.services} />
      <ServiceArea 
        businessName={businessData.basic_info.name}
        address={businessData.basic_info.address}
        latitude={businessData.basic_info.latitude}
        longitude={businessData.basic_info.longitude}
        phone={businessData.basic_info.phone}
      />
      <ReviewsSection reviews={businessData.reviews} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}