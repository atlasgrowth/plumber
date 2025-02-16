
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

  const services = [
    {
      title: "Bathroom Installation",
      description: "Complete bathroom installations including fixtures, toilets, and showers.",
      icon: <Bath className="w-12 h-12" />,
      features: ["Modern Fixtures", "Custom Designs", "Expert Installation"]
    },
    {
      title: "Kitchen Installation",
      description: "Full kitchen plumbing installations from sinks to dishwashers.",
      icon: <Wrench className="w-12 h-12" />,
      features: ["Premium Materials", "Efficient Setup", "Full Service"]
    },
    {
      title: "Water Heater Installation",
      description: "Expert installation of traditional and tankless water heaters.",
      icon: <Droplet className="w-12 h-12" />,
      features: ["Energy Efficient", "Quick Install", "Extended Warranty"]
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
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <div className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
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

        {/* Services Grid */}
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="relative bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-900/50 rounded-2xl p-4 mb-6">
                        <div className="text-blue-400">
                          {service.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6">
                        {service.description}
                      </p>

                      <div className="w-full space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="bg-gray-900/50 rounded-lg px-4 py-2 text-gray-300"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-6 rounded-xl"
                      >
                        <Phone className="w-5 h-5" />
                        Schedule Installation
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Licensed & Insured</h3>
                </div>
                <p className="text-gray-300">Fully certified professionals you can trust.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">24/7 Service</h3>
                </div>
                <p className="text-gray-300">Round-the-clock emergency availability.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Fair Pricing</h3>
                </div>
                <p className="text-gray-300">Transparent pricing, no hidden fees.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
