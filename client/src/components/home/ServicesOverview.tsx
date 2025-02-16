
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
  businessName?: string;
}

export function ServicesOverview({ services = [], businessName = "" }: ServicesOverviewProps) {
  const defaultServices = [
    {
      title: "Residential Services",
      description: `Trust ${businessName} for all your home plumbing needs. From quick repairs to complete installations, our expert team delivers reliable solutions that keep your household running smoothly.`,
      image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?auto=format&fit=crop&q=80&w=600",
      link: "/residential"
    },
    {
      title: "Commercial Services",
      description: `${businessName} provides comprehensive commercial plumbing solutions that keep your business operating at peak efficiency. Our experienced team understands the unique challenges of commercial plumbing systems.`,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600",
      link: "/commercial"
    },
    {
      title: "Emergency Services",
      description: `Available 24/7 for your urgent plumbing needs. When disaster strikes, ${businessName} is ready to respond with immediate solutions to protect your property and restore your peace of mind.`,
      image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=600",
      link: "/residential#emergency"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Services</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {businessName} delivers professional plumbing solutions tailored to your needs, backed by years of experience and a commitment to excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(services.length ? services : defaultServices).map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-4">{service.description}</p>
                {'link' in service && (
                  <Button className="w-full md:w-auto" asChild>
                    <Link href={preserveQueryParams(service.link)}>Learn More</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
