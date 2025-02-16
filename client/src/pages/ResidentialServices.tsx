
import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Clock, Bath, Droplet, WrenchScrewdriver } from "lucide-react";
import { motion } from "framer-motion";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

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
        {/* Hero Section with Background Image */}
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

        {/* Services Sections */}
        <div className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Installation Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                <div className="relative bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-900/50 rounded-2xl p-4 mb-6">
                      <WrenchScrewdriver className="h-12 w-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Installation Services</h3>
                    <p className="text-gray-300 mb-6">Expert plumbing installation for all your home needs</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl">
                      Schedule Service
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Repair Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative"
              >
                <div className="relative bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-900/50 rounded-2xl p-4 mb-6">
                      <Wrench className="h-12 w-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Repair Services</h3>
                    <p className="text-gray-300 mb-6">Quick and reliable repair solutions for any plumbing issue</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl">
                      Schedule Service
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Emergency Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="relative bg-gray-800 rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gray-900/50 rounded-2xl p-4 mb-6">
                      <Clock className="h-12 w-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Emergency Services</h3>
                    <p className="text-gray-300 mb-6">24/7 emergency response for urgent plumbing needs</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl">
                      Schedule Service
                    </Button>
                  </div>
                </div>
              </motion.div>
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
