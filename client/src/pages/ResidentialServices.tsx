
import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Clock, Bath, Droplet } from "lucide-react";
import { motion } from "framer-motion";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const serviceCategories = [
    {
      title: "Installation Services",
      description: "Professional installation solutions for your home",
      icon: Wrench,
      services: [
        {
          title: "Water Heater Installation",
          description: "Expert installation of all water heater types",
          features: ["Tankless systems", "Traditional tanks", "Heat pump water heaters"]
        },
        {
          title: "Fixture Installation",
          description: "Quality installation of plumbing fixtures",
          features: ["Faucets & sinks", "Toilets & bidets", "Showers & tubs"]
        },
        {
          title: "Pipe Installation",
          description: "New piping and repiping services",
          features: ["Whole house repiping", "New construction", "Pipe replacement"]
        }
      ]
    },
    {
      title: "Repair Services",
      description: "Fast and reliable repair solutions",
      icon: Bath,
      services: [
        {
          title: "Emergency Repairs",
          description: "24/7 emergency plumbing repairs",
          features: ["Burst pipes", "Major leaks", "Flooding issues"]
        },
        {
          title: "General Repairs",
          description: "Common plumbing repair solutions",
          features: ["Leaky faucets", "Running toilets", "Clogged drains"]
        },
        {
          title: "Diagnostic Services",
          description: "Advanced plumbing diagnostics",
          features: ["Video inspection", "Leak detection", "Pressure testing"]
        }
      ]
    },
    {
      title: "Maintenance Services",
      description: "Preventive maintenance and upkeep",
      icon: ShieldCheck,
      services: [
        {
          title: "Regular Maintenance",
          description: "Scheduled maintenance services",
          features: ["Annual inspections", "System cleaning", "Preventive repairs"]
        },
        {
          title: "Drain Services",
          description: "Complete drain maintenance",
          features: ["Drain cleaning", "Hydro jetting", "Root removal"]
        },
        {
          title: "Water Treatment",
          description: "Water quality solutions",
          features: ["Water softening", "Filtration systems", "Water testing"]
        }
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
      <div className="min-h-screen">
        {/* Hero Section */}
        <div 
          className="relative py-32 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80")',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Residential Plumbing Services
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Professional plumbing solutions for your home, delivered with precision and care.
              </p>
              {businessData?.basic_info?.phone && (
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {businessData.basic_info.phone}
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <category.icon className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">{category.title}</h2>
                <p className="text-xl text-gray-300">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: serviceIndex * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                        <ul className="space-y-2 mb-6 text-gray-300">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <ShieldCheck className="h-5 w-5 text-blue-400 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl">
                          Schedule Service
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Contact Form Section */}
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-white mb-8">
                Request a Service
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
