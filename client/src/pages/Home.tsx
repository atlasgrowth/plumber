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
        city={businessData.basic_info.city}
        is24_7={businessData.basic_info.working_hours?.includes("Open 24 hours")}
      />
      <AboutSection 
        businessName={businessData.basic_info.name}
        phone={businessData.basic_info.phone}
        city={businessData.basic_info.city}
      />
      <ServicesOverview 
        services={businessData.services} 
        businessName={businessData.basic_info.name} 
      />
      <ServiceArea 
        businessName={businessData.basic_info.name}
        address={businessData.basic_info.address}
        latitude={businessData.basic_info.latitude}
        longitude={businessData.basic_info.longitude}
        phone={businessData.basic_info.phone}
      />
      <ReviewsSection reviews={businessData.reviews?.map(review => ({
        text: review.text,
        reviewer_name: review.author_name,
        date: review.time
      }))} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}