import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Clock } from "lucide-react";
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
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">Residential Plumbing Services</h1>
              <p className="text-xl mb-8">Professional plumbing solutions for your home, delivered with expertise and care.</p>
              {businessData?.basic_info?.phone && (
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call {businessData.basic_info.phone}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Installation Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Wrench className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Installation Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• New Construction Plumbing</li>
                <li>• Water Heater Installation</li>
                <li>• Sink & Faucet Installation</li>
                <li>• Bathroom Remodeling</li>
                <li>• Pipe Installation</li>
                <li>• Garbage Disposal Setup</li>
                <li>• Water Filtration Systems</li>
              </ul>
            </motion.div>

            {/* Repair Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Repair Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Leak Detection & Repair</li>
                <li>• Drain Cleaning</li>
                <li>• Pipe Repair</li>
                <li>• Toilet Repair</li>
                <li>• Faucet & Fixture Repair</li>
                <li>• Sump Pump Repair</li>
                <li>• Water Heater Repair</li>
              </ul>
            </motion.div>

            {/* Emergency Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Emergency Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• 24/7 Emergency Response</li>
                <li>• Burst Pipe Repair</li>
                <li>• Emergency Water Shutdown</li>
                <li>• Flood Damage Prevention</li>
                <li>• Sewage Backup</li>
                <li>• Water Heater Emergencies</li>
                <li>• Major Leak Control</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Request Service</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}