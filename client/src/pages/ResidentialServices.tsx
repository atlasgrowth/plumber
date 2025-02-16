
import { useBusinessData, useSiteId } from "@/hooks/useBusinessData";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ContactForm } from "@/components/common/ContactForm";
import { Button } from "@/components/ui/button";
import { Phone, Wrench, ShieldCheck, Clock, CheckCircle2, Droplet, Home, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ResidentialServices() {
  const siteId = useSiteId();
  const { data: businessData, isLoading } = useBusinessData(siteId);

  const residentialServices = [
    {
      title: "Installation Services",
      description: "Expert installation for all your plumbing needs",
      icon: <Wrench className="w-16 h-16 text-primary mb-4" />,
      color: "from-blue-500/20 to-cyan-500/20",
      features: [
        "Complete water heater installation",
        "Modern fixture upgrades",
        "Full pipe system installation",
        "Smart water systems setup",
        "Bathroom & kitchen remodeling",
        "Water filtration solutions"
      ]
    },
    {
      title: "Repair Services",
      description: "Fast and reliable repair solutions",
      icon: <Home className="w-16 h-16 text-primary mb-4" />,
      color: "from-green-500/20 to-emerald-500/20",
      features: [
        "24/7 emergency leak repair",
        "High-tech drain cleaning",
        "Advanced pipe restoration",
        "Fixture repair & maintenance",
        "Sewer line solutions",
        "Water pressure optimization"
      ]
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency plumbing solutions",
      icon: <Zap className="w-16 h-16 text-primary mb-4" />,
      color: "from-red-500/20 to-orange-500/20",
      features: [
        "Immediate response team",
        "Burst pipe emergency repair",
        "Flood prevention & control",
        "Critical system failures",
        "Emergency drain clearing",
        "Disaster mitigation"
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
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 relative"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Expert Residential Plumbing
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            Professional solutions for your home, delivered with precision and care.
            Available 24/7 for all your plumbing needs.
          </p>
          {businessData?.basic_info?.phone && (
            <div className="flex justify-center">
              <Button size="lg" asChild className="gap-2 shadow-lg hover:shadow-xl transition-all scale-105 hover:scale-110">
                <a href={`tel:${businessData.basic_info.phone}`}>
                  <Phone className="h-5 w-5" />
                  Call Now: {businessData.basic_info.phone}
                </a>
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-dot-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {residentialServices.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={index}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50`} />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100/50 h-full">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 group-hover:translate-x-1 transition-transform">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16 rounded-2xl p-8 bg-white/50 backdrop-blur-sm border border-gray-100/50">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-center mb-8"
            >
              Why Choose Us?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold">Licensed & Insured</h3>
                </div>
                <p className="text-gray-600">Fully certified professionals you can trust with your home.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold">24/7 Availability</h3>
                </div>
                <p className="text-gray-600">Round-the-clock emergency services at your disposal.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold">Fair Pricing</h3>
                </div>
                <p className="text-gray-600">Transparent pricing with no hidden fees or surprises.</p>
              </motion.div>
            </div>
          </div>

          {/* Contact Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100/50"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              Request Service
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
