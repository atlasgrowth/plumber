import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Award } from "lucide-react";

interface AboutSectionProps {
  businessName: string;
}

export function AboutSection({ businessName }: AboutSectionProps) {
  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Full coverage for your peace of mind",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Emergency response when you need it most",
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Experienced professionals you can trust",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose {businessName}?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
