import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { preserveQueryParams } from "@/lib/utils";

interface Service {
  title: string;
  description: string;
  image_url?: string;
}

interface ServicesOverviewProps {
  services?: Service[];
}

export function ServicesOverview({ services = [] }: ServicesOverviewProps) {
  const defaultServices = [
    {
      title: "Residential Services",
      description: "Complete plumbing solutions for your home",
      link: "/residential"
    },
    {
      title: "Commercial Services",
      description: "Professional plumbing for businesses",
      link: "/commercial"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(services.length ? services : defaultServices).map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-8 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              {'link' in service && (
                <Button className="mt-auto self-start" asChild>
                  <Link href={preserveQueryParams(service.link)}>Learn More</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}